const defaultState = {
  currentId: null,
  data: [],
  isEdit: false,
  siteEdit: {}
};

let index;

const SiteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_SITES":
      return {
        ...state,
        data: action.payload ? [...action.payload] : []
      };
    case "UPDATE_SITE_ID":
      return {
        ...state,
        currentId: action.payload
      };
    case "PUBLISH_SITE":
      index = state.data.findIndex(site => site.id === action.payload);
      state.data[index].isPublish = true;
      return {
        ...state,
        data: [...state.data]
      };
    case "UNPUBLISH_SITE":
      index = state.data.findIndex(site => site.id === action.payload);
      state.data[index].isPublish = false;
      return {
        ...state,
        data: [...state.data]
      };
    case "GET_ALL_SITE":
      return {
        ...state,
        data: [...action.payload]
      };
    case "GET_SITE_BY_ID":
      return {
        ...state,
        data: [...action.payload]
      };
    case "CREATE_NEW_SITE_SUCCESS":
      return {
        ...state,
        data: [action.payload]
      };
    case "CHANGE_COLOR":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_FONT_TITLE":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_FONT_BODY":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "SET_SITE_IS_EDIT":
      return {
        ...state,
        isEdit: action.payload.isEdit,
        siteEdit: action.payload.site
      };
    case "CHANGE_NAV_ITEMS":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "SET_THEME_TO_SITE":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_THEME":
      return {
        ...state,
        siteEdit: { ...action.payload }
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
