export function openSnackBar(msg, type) {
  return dispatch => {
    dispatch({
      type: "OPEN_SNACKBAR",
      payload: {
        msg,
        type
      }
    });
  };
}

export function closeSnackBar() {
  return dispatch => {
    dispatch({
      type: "CLOSE_SNACKBAR"
    });
  };
}
