export function updateTabValue(value) {
  return dispatch => {
    dispatch({
      type: "UPDATE_TAB_VALUE",
      payload: value
    });
  };
}

export function updateNavItemValue(value) {
  return dispatch => {
    dispatch({
      type: "UPDATE_NAVITEM_VALUE",
      payload: value
    });
  };
}
