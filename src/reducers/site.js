const defaultState = {
  currentId: null,
  data: [
    {
      id: "",
      isActive: false
    }
  ]
};

const SiteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_SITE_ID":
      return {
        ...state,
        currentId: action.payload
      };
    case "PUBLISH_SITE":
      const index = state.data.indexOf({ id: action.payload.id });
      state.data[index].isActive = action.payload.isActive;
      return {
        ...state,
        data: [...state.data]
      };
    case "UNPUBLISH_SITE":
      return {
        ...state,
        currentId: action.payload
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
