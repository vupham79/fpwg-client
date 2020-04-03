import axios from "../utils/axios";
import toastr from "toastr";

export function updateTheme(id, name, fontBody, fontTitle, mainColor) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "PATCH",
        url: `/theme/update/${id}`,
        data: {
          name: name,
          fontBody: fontBody,
          fontTitle: fontTitle,
          mainColor: mainColor
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_THEME_UPDATED",
          payload: {
            id: id,
            name: name,
            fontBody: fontBody,
            fontTitle: fontTitle,
            mainColor: mainColor
          }
        });
      } else {
        toastr.error(`Unable to update theme`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(error, "Error");
    }
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

export function getNavItems() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/navItem/findAll"
      });
      dispatch({
        type: "GET_NAV_ITEMS",
        payload: data.data
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to get nav items`, "Error");
    }
  };
}

export function getAllThemes() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/theme/findAll"
      });
      dispatch({
        type: "GET_ALL_THEME",
        payload: data.data
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to get themes`, "Error");
    }
  };
}

export function getAllThemesAdmin() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/theme/findAll"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_THEMES",
          payload: data.data
        });
      } else {
        toastr.error(`Unable to get themes`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to get themes`, "Error");
    }
  };
}
