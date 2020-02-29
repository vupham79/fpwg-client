const defaultState = {
  data: []
};

const PathReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_LOADING":
      return {
        ...state,
        loading: true
      };
    case "CLOSE_LOADING":
      return {
        ...state,
        loading: false
      };
    case "SET_ALL_PATHS":
      return {
        ...state,
        data: action.payload ? [...action.payload] : []
      };
    default:
      return state;
  }
};

export default PathReducer;
