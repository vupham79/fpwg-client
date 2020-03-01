const defaultState = {
  isActive: true,
  posts: null
};

const PostReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_ALL_POST":
      return {
        ...state,
        posts: [...action.payload]
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    default:
      return state;
  }
};

export default PostReducer;
