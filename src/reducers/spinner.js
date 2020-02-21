const defaultState = {
  loading: false
};

const SpinnerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true
      };
    case "CLOSE_LOADING":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default SpinnerReducer;
