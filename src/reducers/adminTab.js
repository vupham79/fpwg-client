const defaultState = {
  selectedAdminIndex: 0
};

const AdminTabReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_INDEX":
      return {
        ...state,
        selectedAdminIndex: action.payload
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default AdminTabReducer;
