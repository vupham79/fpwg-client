const defaultState = {
  name: "theme2",
  color: "red",
  fontTitle: "Arial",
  fontBody: "Arial",
  navItems: [
    {
      name: "Home",
      order: 1,
      isActive: true
    },
    {
      name: "About",
      order: 2,
      isActive: true
    },
    {
      name: "Gallery",
      order: 3,
      isActive: true
    },
    {
      name: "Event",
      order: 4,
      isActive: true
    },
    {
      name: "Contact",
      order: 5,
      isActive: true
    },
    {
      name: "News",
      order: 6,
      isActive: true
    }
  ],
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
    case "GET_NAV_ITEMS":
      return {
        ...state,
        navItems: action.payload
      };
    case "CHANGE_NAV_ITEMS":
      return {
        ...state,
        navItems: [...action.payload]
      };
    default:
      return state;
  }
};

export default ThemeReducer;
