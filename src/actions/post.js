import axios from "../utils/axios";

export const setActivePost = (post, status) => {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_POST",
      payload: { post, status }
    });
  };
};

export const getAllPost = posts => {
  return dispatch => {
    dispatch({
      type: "SET_POSTS_EDIT",
      payload: posts
    });
  };
};

export const savePosts = posts => {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "PATCH",
        url: "posts/activePosts",
        data: {
          posts: posts
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "UDATE_POSTS",
          payload: {
            posts: data
          }
        });
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
    }
  };
};
