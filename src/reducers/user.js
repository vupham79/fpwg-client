const defaultState = {
  isLogin: false
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: true
      };
    case "SET_LOGOUT":
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};

export default UserReducer;
