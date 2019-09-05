export default function handleErrors(xhr, reject) {
  let error = '';
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
      error = `an error has ocuured: ${xhr.statusText}`;
      if (xhr.responseJSON && xhr.responseJSON.message) {
        error = xhr.responseJSON.message;
      }
      window.Toastr.error(error, 'An error occured', { closeButton: true, timeOut: 20000 });
      reject(xhr.statusText);
      break;
  }
}
