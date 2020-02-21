import axios from "../utils/axios";

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

export function changeNavItems(items) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEMS",
      payload: items
    });
  };
}

export function getNavItems() {
  return async dispatch => {
    const data = await axios({
      method: "GET",
      url: "/navItem/findAll"
    });
    dispatch({
      type: "GET_NAV_ITEMS",
      payload: data.data
    });
  };
}
