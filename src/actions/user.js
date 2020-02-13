export function setLogin(isLogin) {
  console.log(isLogin);
  return dispatch => {
    dispatch({
      type: "SET_LOGIN",
      payload: isLogin
    });
  };
}
