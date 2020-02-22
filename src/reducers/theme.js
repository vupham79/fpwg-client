const defaultState = {
  data: []
};

const ThemeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        name: action.payload
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
    case "GET_NAV_ITEMS":
      return {
        ...state,
        navItems: action.payload
      };
    case "GET_ALL_THEME":
      return {
        ...state,
        data: [...action.payload]
      };

    default:
      return state;
  }
};

export default ThemeReducer;
