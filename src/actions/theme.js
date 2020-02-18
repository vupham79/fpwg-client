export function changeTheme(name) {
  return dispatch => {
    dispatch({
      type: "CHANGE_THEME",
      payload: name
    });
  };
}

export function changeColor(color) {
  return dispatch => {
    dispatch({
      type: "CHANGE_COLOR",
      payload: color
    });
  };
}

export function changeFontTitle(fontTitle) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_TITLE",
      payload: fontTitle
    });
  };
}

export function changeFontBody(fontBody) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_BODY",
      payload: fontBody
    });
  };
}

export function setShowCustomColor(isShow) {
  return dispatch => {
    dispatch({
      type: "SET_SHOW_CUSTOM_COLOR",
      payload: isShow
    });
  };
}
export function openLoading() {
  return dispatch => {
    dispatch({
      type: "OPEN_LOADING"
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

export function changeNavItems(navItems) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEMS",
      payload: navItems
    });
  };
}
