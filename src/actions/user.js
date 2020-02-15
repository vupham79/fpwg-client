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

export function setEdit(isEdit) {
  return dispatch => {
    dispatch({
      type: "SET_EDIT",
      payload: isEdit
    });
  };
}
