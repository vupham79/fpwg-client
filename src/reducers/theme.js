const defaultState = {
  data: []
};

let index;

const ThemeReducer = (state = defaultState, action) => {
  switch (action.type) {
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
    case "SET_ALL_THEMES":
      return {
        ...state,
        data: action.payload ? [...action.payload] : []
      };
    case "SET_THEME_UPDATED":
      index = state.data.findIndex(theme => theme.id === action.payload.id);
      state.data[index].name = action.payload.name;
      state.data[index].fontBody = action.payload.fontBody;
      state.data[index].fontTitle = action.payload.fontTitle;
      state.data[index].mainColor = action.payload.mainColor;
      return {
        ...state,
        data: [...state.data]
      };
    default:
      return state;
  }
};

export default ThemeReducer;
