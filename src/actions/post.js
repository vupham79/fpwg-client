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
        url: "post/activePosts",
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

export const getDataByPageNumber = ({ siteId, page, pageNumber, sitePath }) => {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "GET",
        url: "/site/findByTab",
        params: {
          id: siteId,
          page: page,
          pageNumber: pageNumber,
          sitePath: sitePath
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        return data.data;
      } else {
        return null;
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      return null;
    }
  };
};

export const setPostsToSiteView = posts => {
  return dispatch => {
    dispatch({
      type: "SET_SITEVIEW_NEWS",
      payload: posts.data.posts
    });
    dispatch({
      type: "SET_PAGECOUNT_VIEW",
      payload: posts.pageCount
    });
  };
};

export const setPostsToSiteEdit = posts => {
  return dispatch => {
    dispatch({
      type: "SET_SITEEDIT_NEWS",
      payload: posts.data.posts
    });
    dispatch({
      type: "SET_PAGECOUNT_EDIT",
      payload: posts.pageCount
    });
  };
};
