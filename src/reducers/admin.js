const defaultState = {
  username: "",
  password: "",
};

let index;

const AdminReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_LOGIN_ADMIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
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
