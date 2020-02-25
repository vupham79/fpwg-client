export function showLoading() {
  return dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
  };
}

export function closeLoading() {
  return dispatch => {
    dispatch({
      type: "CLOSE_LOADING"
    });
  };
}
