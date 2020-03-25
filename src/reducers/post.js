const defaultState = {
  posts: null,
  pageCountNewsView: 1,
  pageCountGalleriesView: 1,
  pageCountEventView: 1
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
    case "SET_PAGECOUNT_NEWS_VIEW":
      return {
        ...state,
        pageCountNewsView: action.payload
      };
    case "SET_PAGECOUNT_GALLERIES_VIEW":
      return {
        ...state,
        pageCountGalleriesView: action.payload
      };
    case "SET_PAGECOUNT_EVENT_VIEW":
      return {
        ...state,
        pageCountEventView: action.payload
      };
    default:
      return state;
  }
};

export default PostReducer;
