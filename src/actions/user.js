export function setLogin() {
  return dispatch => {
    dispatch({
      type: "SET_LOGIN"
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
