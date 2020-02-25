import axios from "../utils/axios";

export function setShowCustomColor(isShow) {
  return dispatch => {
    dispatch({
      type: "SET_SHOW_CUSTOM_COLOR",
      payload: isShow
    });
  };
}

export function getNavItems() {
  return async dispatch => {
    const data = await axios({
      url: "/navItem/findAll"
    });
    dispatch({
      type: "GET_NAV_ITEMS",
      payload: data.data
    });
  };
}

export function getAllThemes() {
  return async dispatch => {
    const data = await axios({
      url: "/theme/findAll"
    });
    dispatch({
      type: "GET_ALL_THEME",
      payload: data.data
    });
  };
}
