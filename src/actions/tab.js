export function updateTabValue(value) {
  return dispatch => {
    dispatch({
      type: "UPDATE_TAB_VALUE",
      payload: value
    });
  };
}
