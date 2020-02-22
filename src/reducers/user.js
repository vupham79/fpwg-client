const defaultState = {
  profile: {},
  accessToken: "",
  isLogin: false,
  isEdit: false,
  pages: [],
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        profile: action.payload.profile,
        accessToken: action.payload.accessToken,
        isLogin: true
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    case "SET_EDIT":
      return {
        ...state,
        isEdit: action.payload
      };
    case "SET_USER_PAGES":
      return {
        ...state,
        pages: action.payload
      };
    default:
      return state;
  }
};

export default UserReducer;
