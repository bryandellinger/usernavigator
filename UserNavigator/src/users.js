import AjaxService from './services/ajaxService';

const template = require('./views/users.handlebars');
const navTemplate = require('./views/navigation.handlebars');
const subordinateTemplate = require('./views/subordinate.handlebars');
const subordinatenodataTemplate = require('./views/subordinatenodata.handlebars');
const spinnerTemplate = require('./views/spinner.handlebars');

export default class Users {
  constructor() {
    this.state = {
      index: 0,
      search: null,
      data: [],
      itemsPerPage: 3,
    };
  }

  init() {
    this.initPrevious();
    this.initNext();
    this.initSearch();
    this.initSubordinate();
    this.initSearchable();
    this.getData();
  }

  setState(state) {
    this.state = state;
  }

  initSearchable() {
    $('body').on('click', '.searchable', (event) => {
      const text = $(event.target).text().split('/')[0];
      $('#searchInput').val(text);
      this.setSearchParams();
    });
  }

  initSubordinate() {
    $('body').on('click', '.subordinateBtn', (event) => {
      const posNo = $(event.currentTarget).attr('value');
      $(`#subordinate_${posNo}`).empty().append(spinnerTemplate());
      AjaxService.ajaxGet(`./api/EmployeeHierarchy/${posNo}`)
        .then((data) => {
          const filterFn = (x) => Object.is(x.empLevel, 2);
          const d = data.length ? this.getChildrenRecursive(data.filter(filterFn), data) : data;
          const subTemplate = d.length ? subordinateTemplate(d) : subordinatenodataTemplate();
          $(`#subordinate_${posNo}`).empty().append(subTemplate);
        })
        .catch(() => {
          $(`#subordinate_${posNo}`).empty();
        });
    });
  }

  getChildrenRecursive(filteredArr, arr) {
    const fa = filteredArr;
    for (let i = 0; i < filteredArr.length; i += 1) {
      fa[i].children = arr.filter((x) => x.spvR_POS_NO === fa[i].poS_NO);
      if (fa[i].children.length) {
        this.getChildrenRecursive(fa[i].children, arr);
      }
    }
    return filteredArr;
  }

  getData() {
    const { search } = this.state;
    $('#peopleContainer').empty().append(spinnerTemplate());
    AjaxService.ajaxGet(`./api/users/${search}`).then((d) => {
      this.setState({ ...this.state, data: d });
      this.render();
    }).catch(() => {
      $('#peopleContainer').empty();
    });
  }

  render() {
    const { index, itemsPerPage, data } = this.state;
    const d = data.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage);
    const t = template(d);
    const start = (index + 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const showNextBtn = data.slice(start, end).length;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const showPageCount = data.length > itemsPerPage;
    const showMoreThan = totalPages >= 10000;
    const navT = navTemplate(
      {
        showPreviousBtn: index,
        showNextBtn,
        currentPage: index + 1,
        totalPages,
        showPageCount,
        showMoreThan,
      },
    );
    $('#peopleContainer').empty().append(t);
    $('#navContainer').empty().append(navT);
  }


  initSearch() {
    $('body').on('click', '#searchBtn', () => this.setSearchParams());
    $('#searchInput').keyup(() => {
      if (Object.is(window.event.keyCode, 13)) {
        this.setSearchParams();
      }
    });
  }

  setSearchParams() {
    const search = $('#searchInput').val() || null;
    this.setState({ ...this.state, index: 0, search });
    this.getData();
  }

  initPrevious() {
    $('body').on('click', '#previousBtn', () => {
      const { index } = this.state;
      this.setState({ ...this.state, index: index - 1 });
      this.render();
    });
  }

  initNext() {
    $('body').on('click', '#nextBtn', () => {
      const { index } = this.state;
      this.setState({ ...this.state, index: index + 1 });
      this.render();
    });
  }
}
