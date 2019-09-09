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
      cache: new Map(),
    };
  }

  init() {
    this.initPrevious();
    this.initNext();
    this.initSearch();
    subordinates.initSubordinate();
    this.initSearchable();
    this.initClearBtn();
    this.getData();
  }

  initClearBtn() {
    $('body').on('click', '#clearBtn', () => {
      $('#searchInput').val('');
      this.setSearchParams();
    });
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
    const { search, cache } = this.state;
    const key = (search || 'none').toLowerCase();
    $('#peopleContainer').empty().append(spinnerTemplate());
    if (cache.get(key)) {
      this.setState({ ...this.state, data: cache.get(key) });
      this.render();
    } else {
      AjaxService.ajaxGet(`./api/users/${search}`).then((d) => {
        cache.set(key, d);
        this.setState({ ...this.state, data: d, cache });
        const searchText = search || $('#searchInput').val();
        if (search) {
          $('#searchList').append(`<option value='${searchText.toLowerCase()}'>`);
        }
        this.render();
      }).catch(() => {
        $('#peopleContainer').empty();
      });
    }
  }

  render() {
    const { index, itemsPerPage, data } = this.state;
    const d = data.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage);
    const t = template(d.map((x) => ({ ...x, showCards: d.length > 1 })));
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
    const self = this;
    $('body').on('click', '#searchBtn', () => this.setSearchParams());
    $('#searchInput').keyup(() => {
      if (Object.is(window.event.keyCode, 13)) {
        this.setSearchParams();
      }
    });

    $('#searchInput').on('input', (e1) => {
      const val = e1.target.value;
      // eslint-disable-next-line func-names
      if ($('#searchList option').filter(function () {
        return this.value && this.value.toUpperCase() === val.toUpperCase();
      }).length) {
        self.setSearchParams();
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
