import handleErrors from './handleErrors';

export default class AjaxService {
  static ajaxGet(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        cache: false,
      })
        .done((responseData) => {
          resolve(responseData);
        })
        .fail((jqXHR) => {
          handleErrors(jqXHR, reject);
        });
    });
  }
}
