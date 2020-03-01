export function openDialog() {
  return dispatch => {
    dispatch({
      type: "OPEN_DIALOG"
    });
  };
}

export function closeDialog() {
  return dispatch => {
    dispatch({
      type: "CLOSE_DIALOG"
    });
  };
}
