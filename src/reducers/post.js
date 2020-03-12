const defaultState = {
  posts: null
};

const PostReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_POSTS_EDIT":
      return {
        ...state,
        posts: [...action.payload]
      };
    case "SET_ACTIVE_POST":
      return {
        ...state,
        posts: [...action.payload]
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    case "UDATE_POSTS":
      return {
        ...state,
        posts: [...action.payload]
      };
    default:
      return state;
  }
};

export default PostReducer;
