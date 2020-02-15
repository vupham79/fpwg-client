export function setLogin(isLogin) {
  return dispatch => {
    dispatch({
      type: "SET_LOGIN",
      payload: isLogin
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
