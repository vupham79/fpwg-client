const defaultState = {
  isLogin: false
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: action.payload
      };
    default:
      return state;
  }
};

export default UserReducer;
