const defaultState = {
  isLogin: true,
  isEdit: false
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: action.payload
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
