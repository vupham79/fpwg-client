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
      const { status } = action.payload;
      let update = state.posts.map(post => {
        if (post.id === action.payload.post.id) {
          post.isActive = status;
        }
        return post;
      });
      return {
        ...state,
        posts: [...update]
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
