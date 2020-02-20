const defaultState = {
  url:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJZLvDxmOKEfBe-JfqgJ0WQhq808reFgcd0cpAQR1UGjPa6N_3"
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_IMAGE_URL":
      return {
        ...state,
        url: action.payload
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default UserReducer;
