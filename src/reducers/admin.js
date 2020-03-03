const defaultState = {
  isLoginAdmin: false
};

const AdminReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN_ADMIN":
      return {
        ...state,
        isLoginAdmin: true
      };
    case "SET_LOGOUT_ADMIN":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default AdminReducer;
