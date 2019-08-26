/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import { AjaxService } from './services/ajaxService';

const template = require('./views/users.handlebars');
const navTemplate = require('./views/navigation.handlebars');

class Users {
  constructor() {
    this.ajaxService = new AjaxService();
    this.index = 0;
    this.search = null;
    this.data = [];
    this.itemsPerPage = 3;
    this.init();
  }

  init() {
    this.initPrevious();
    this.initNext();
    this.initSearch();
    this.getData();
  }

  getData() {
    $('#peopleContainer').empty().append('<div class="fa-3x"><i class="fas fa-spinner fa-spin"></i></div>');
    this.ajaxService.ajaxGet(`./api/users/${this.search}`).then((data) => {
      this.data = data;
      this.render();
    });
  }

  render() {
    const _template = template(this.data.slice(
      this.index * this.itemsPerPage,
      this.index * this.itemsPerPage + this.itemsPerPage,
    ));
    const _navTemplate = navTemplate(
      {
        showPreviousBtn: this.index,
        showNextBtn: this.data.slice((this.index + 1) * this.itemsPerPage,
          (this.index + 1) * this.itemsPerPage + this.itemsPerPage).length,
        currentPage: this.index + 1,
        totalPages: Math.ceil(this.data.length / this.itemsPerPage),
        showPageCount: this.data.length > this.itemsPerPage,
        showMoreThan: Math.ceil(this.data.length / this.itemsPerPage) >= 10000,
      },
    );
    $('#peopleContainer').empty().append(_template);
    $('#navContainer').empty().append(_navTemplate);
  }

  initSearch() {
    $('body').on('click', '#searchBtn', () => this.setSearchParams());
    $('#searchInput').keyup(() => {
      if (event.keyCode === 13) {
        this.setSearchParams();
      }
    });
  }

  setSearchParams() {
    this.index = 0;
    this.search = $('#searchInput').val() || null;
    this.getData();
  }

  initPrevious() {
    $('body').on('click', '#previousBtn', () => {
      this.index -= 1;
      this.render();
    });
  }

  initNext() {
    $('body').on('click', '#nextBtn', () => {
      this.index += 1;
      this.render();
    });
  }
}


export { Users };
