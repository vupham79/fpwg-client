const defaultState = {
  currentId: null,
  data: [
    {
      id: "",
      isActive: false,
      title: "",
      category: "",
      logo: ""
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
      const publishIndex = state.data.findIndex(
        e => e.id === action.payload.id
      );
      state.data[publishIndex].isPublish = action.payload.isPublish;
      return {
        ...state,
        data: [...state.data]
      };
    case "UNPUBLISH_SITE":
      const unPublishIndex = state.data.findIndex(
        e => e.id === action.payload.id
      );
      state.data[unPublishIndex].isPublish = action.payload.isPublish;
      return {
        ...state,
        data: [...state.data]
      };
    case "CREATE_NEW_SITE":
      return {
        ...state,
        data: [...action.payload]
      };
    case "GET_ALL_SITE":
      return {
        ...state,
        data: [...action.payload]
      };
    case "EDIT_SITE":
      const editIndex = state.data.findIndex(e => e.id === action.payload.id);
      state.data[editIndex] = action.payload;
      return {
        data: [...action.payload]
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
