const defaultState = {
  open: false
};

const DialogReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...state,
        open: true
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        open: false
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default DialogReducer;
