/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import { AjaxService } from './services/ajaxService';

const template = require('./views/users.handlebars');
const navTemplate = require('./views/navigation.handlebars');
const subordinateTemplate = require('./views/subordinate.handlebars');
const subordinatenodataTemplate = require('./views/subordinatenodata.handlebars');
const spinnerTemplate = require('./views/spinner.handlebars');

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
    this.initSubordinate();
    this.getData();
  }

  initSubordinate() {
    let { ajaxService, posNo, _subordinateTemplate } = this;
    $('body').on('click', '.subordinateBtn', (event) => {
      posNo = $(event.currentTarget).attr('value');
      $(`#subordinate_${posNo}`).empty().append(spinnerTemplate());
      ajaxService.ajaxGet(`./api/EmployeeHierarchy/${posNo}`).then((data) => {
        _subordinateTemplate = data.length
          ? subordinateTemplate(data) : subordinatenodataTemplate();

        $(`#subordinate_${posNo}`).empty().append(_subordinateTemplate);
      });
    });
  }

  getData() {
    const { ajaxService } = this;
    $('#peopleContainer').empty().append(spinnerTemplate());
    ajaxService.ajaxGet(`./api/users/${this.search}`).then((d) => {
      this.data = d;
      this.render();
    });
  }

  render() {
    let {
      index, itemsPerPage, data, _template, _navTemplate,
    } = this;

    _template = template(data.slice(
      index * itemsPerPage,
      index * itemsPerPage + itemsPerPage,
    ));

    _navTemplate = navTemplate(
      {
        showPreviousBtn: index,
        showNextBtn: data.slice((index + 1) * itemsPerPage,
          (index + 1) * itemsPerPage + itemsPerPage).length,
        currentPage: index + 1,
        totalPages: Math.ceil(data.length / itemsPerPage),
        showPageCount: data.length > itemsPerPage,
        showMoreThan: Math.ceil(data.length / itemsPerPage) >= 10000,
      },
    );
    $('#peopleContainer').empty().append(_template);
    $('#navContainer').empty().append(_navTemplate);
  }

  initSearch() {
    $('body').on('click', '#searchBtn', () => this.setSearchParams());
    $('#searchInput').keyup(() => {
      if (Object.is(event.keyCode, 13)) {
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
