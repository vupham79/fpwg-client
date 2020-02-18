const defaultState = {
  name: "theme2",
  color: "",
  fontTitle: "",
  fontBody: "",
  isShow: false,
  loading: false
};

const ThemeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        name: action.payload
      };
    case "CHANGE_COLOR":
      return {
        ...state,
        color: action.payload
      };
    case "CHANGE_FONT_TITLE":
      return {
        ...state,
        fontTitle: action.payload
      };
    case "CHANGE_FONT_BODY":
      return {
        ...state,
        fontBody: action.payload
      };
    case "SET_SHOW_CUSTOM_COLOR":
      return {
        ...state,
        isShow: action.payload
      };
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
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default ThemeReducer;
