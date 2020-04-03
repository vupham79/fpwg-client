const defaultState = {
  isLoginAdmin: false,
  categories: null
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
    case "SET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};

export default AdminReducer;
