import axios from "../utils/axios";

export function login({ accessToken, profile }) {
  return async dispatch => {
    dispatch({
      type: "SET_LOGIN",
      payload: {
        accessToken,
        profile
      }
    });
  };
}

export function setLogout() {
  return dispatch => {
    dispatch({
      type: "SET_LOGOUT"
    });
  };
}

export function setEdit(isEdit) {
  return dispatch => {
    dispatch({
      type: "SET_EDIT",
      payload: isEdit
    });
  };
}
