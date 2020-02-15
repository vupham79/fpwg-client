const defaultState = {
  value: 0,
  navItemValue: 0
};

const TabReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_TAB_VALUE":
      return {
        ...state,
        value: action.payload
      };
    case "UPDATE_NAVITEM_VALUE":
      return {
        ...state,
        navItemValue: action.payload
      };
    default:
      return state;
  }
};

export default TabReducer;
