const defaultState = {
  isOpen: false,
  message: "",
  typeAlert: ""
};

const SnackBarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return {
        ...state,
        isOpen: true,
        message: action.payload.msg,
        typeAlert: action.payload.type
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        isOpen: false
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default SnackBarReducer;
