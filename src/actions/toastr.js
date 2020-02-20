export function showToastr(title, content) {
  return dispatch => {
    dispatch({
      type: "SHOW_TOASTR",
      payload: {
        title: title,
        content: content
      }
    });
  };
}
