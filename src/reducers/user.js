const defaultState = {
  isLogin: false,
  isEdit: false
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
    case "SET_EDIT":
      return {
        ...state,
        isEdit: action.payload
      };
    default:
      return state;
  }
};

export default UserReducer;
