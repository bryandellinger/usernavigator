import AjaxService from './services/ajaxService';
import Subordinates from './subordinates';

const template = require('./views/users.handlebars');
const navTemplate = require('./views/navigation.handlebars');
const spinnerTemplate = require('./views/spinner.handlebars');

const subordinates = new Subordinates();

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
    subordinates.initSubordinate();
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
