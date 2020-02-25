const defaultState = {
  profile: {},
  accessToken: "",
  isLogin: false,
  pages: [],
  isAdmin: true,
  users: []
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
    case "SET_USER_PAGES":
      return {
        ...state,
        pages: action.payload
      };
    case "SET_ALL_USERS":
      return {
        ...state,
        users: action.payload ? [...action.payload] : []
      };
    default:
      return state;
  }
};

export default UserReducer;
