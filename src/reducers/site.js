const defaultState = {
  id: null
};

const SiteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_SITE_ID":
      return {
        ...state,
        id: action.payload
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default SiteReducer;
