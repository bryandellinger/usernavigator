import AjaxService from './services/ajaxService';

const subordinateTemplate = require('./views/subordinate.handlebars');
const subordinatenodataTemplate = require('./views/subordinatenodata.handlebars');
const spinnerTemplate = require('./views/spinner.handlebars');

export default class Subordinates {
  constructor() {
    this.state = {
      posNo: null,
      d: [],
    };
  }

  setState(state) {
    this.state = state;
  }

  initSubordinate() {
    $('body').on('click', '.subordinateBtn', (event) => {
      const posNo = $(event.currentTarget).attr('value');
      $(`#subordinate_${posNo}`).empty().append(spinnerTemplate());
      AjaxService.ajaxGet(`./api/EmployeeHierarchy/${posNo}`)
        .then((data) => {
          const filterFn = (x) => Object.is(x.empLevel, 2);
          const d = data.length ? this.getChildrenRecursive(data.filter(filterFn), data) : data;
          this.setState({ ...this.state, d, posNo });
          this.render();
        })
        .catch(() => {
          $(`#subordinate_${posNo}`).empty();
        });
    });
  }

  getChildrenRecursive(filteredArr, arr) {
    const fa = filteredArr;
    for (let i = 0; i < filteredArr.length; i += 1) {
      const filterFn = (x) => x.spvR_POS_NO === fa[i].poS_NO;
      fa[i].children = arr.filter(filterFn);
      if (fa[i].children.length) {
        this.getChildrenRecursive(fa[i].children, arr);
      }
    }
    return filteredArr;
  }

  render() {
    const { posNo, d } = this.state;
    const subTemplate = d.length ? subordinateTemplate(d) : subordinatenodataTemplate();
    $(`#subordinate_${posNo}`).empty().append(subTemplate);
  }
}
