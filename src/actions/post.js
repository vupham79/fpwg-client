import axios from "../utils/axios";
import toastr from "toastr";

export const unActivePost = postId => {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/post/active",
      data: {
        id: postId,
        isPublish: false
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "UNACTIVE_POST",
        payload: data.data
      });
      toastr.success(`UnAtive post success`, "Sucess");
    } else {
      toastr.error(
        "There are something wrong when unpublish your site",
        "Error"
      );
    }
  };
};

export const setActivePost = postId => {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/active",
      data: {
        id: postId,
        isPublish: true
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "ACTIVE_POST",
        payload: data.data
      });
      toastr.success(`Active post sucess`, "Success");
    } else {
      toastr.error("There are something wrong when publish your site", "Error");
    }
  };
};

export const getAllPost = () => {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: "/post/findAll"
      });
      if (data.status === 200) {
        dispatch({
          type: "GET_ALL_POST",
          payload: data.data
        });
      } else {
        toastr.error(
          "There are something wrong when unpublish your site",
          "Error"
        );
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
    }
  };
};
