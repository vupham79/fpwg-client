export const setActivePost = posts => {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_POST",
      payload: posts
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
