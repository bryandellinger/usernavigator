/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
class AjaxService {
  ajaxGet(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        cache: false,
      })
        .done((responseData) => {
          resolve(responseData);
        })
        .fail((jqXHR) => {
          this.handleErrors(jqXHR, reject);
        });
    });
  }


  handleErrors(xhr, reject) {
    switch (xhr.status) {
      case 403: // not authorized
        window.Toastr.error('not authorized');
        reject('not authorized');
        break;
      case 401: // not authorized
        window.Toastr.error('not authorized');
        reject('not authorized');
        break;
      default:
        window.Toastr.error(`error: ${xhr.statusText}`);
        reject(xhr.statusText);
        break;
    }
  }
}
export { AjaxService };
