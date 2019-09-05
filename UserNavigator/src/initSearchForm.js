export default function initSearchForm() {
  $('#searchForm').on('keyup keypress', (e) => {
    const keyCode = e.keyCode || e.which;
    if (Object.is(keyCode, 13)) {
      e.preventDefault();
      return false;
    }
    return true;
  });
}
