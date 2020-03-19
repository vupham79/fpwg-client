import toastr from "../component/Toastr";
import axios from "../utils/axios";
export function login({ accessToken, profile }) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      if (profile.email) {
        const data = await axios({
          method: "post",
          url: "/user",
          data: {
            accessToken: accessToken,
            id: profile.id,
            name: profile.name,
            email: profile.email,
            picture: profile.picture.data.url
          }
        });
        dispatch({
          type: "CLOSE_LOADING"
        });
        if (data.status === 200) {
          dispatch({
            type: "SET_LOGIN",
            payload: {
              accessToken,
              profile
            }
          });
        } else {
          toastr.error("Login failed! Please try again.", "Error");
        }
      } else {
        dispatch({
          type: "CLOSE_LOADING"
        });
        toastr.error(
          "Please add email to your facebook account then try again.",
          "Error"
        );
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (error && error.response) {
        toastr.error(error.response.data, "Error");
      } else {
        toastr.error("Login failed! Please try again.", "Error");
      }
    }
  };
}

export function setLogout() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    dispatch({
      type: "SET_LOGOUT"
    });
    try {
      await axios({
        url: "/user/logout"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
    }
  };
}

export function setEdit(isEdit) {
  return dispatch => {
    dispatch({
      type: "SET_EDIT",
      payload: isEdit
    });
  };
}

export function getAllUsers() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/user/findAll"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_USERS",
          payload: data.data
        });
      } else {
        toastr.error(`Unable to retrieve users`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to retrieve users`, "Error");
    }
  };
}

export function getUserPages() {
  return async dispatch => {
    console.log("hhello");
    try {
      dispatch({
        type: "SHOW_LOADING"
      });
      const data = await axios({
        url: "/user/pages"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_USER_PAGES",
          payload: data.data
        });
      } else {
        toastr.error("Get your pages failed!", "Error");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Get your pages failed!", "Error");
    }
  };
}

export function confirmPage({
  pageUrl,
  pageId,
  name,
  profile,
  sitepath,
  isPublish
}) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const site = await axios({
        method: "POST",
        url: "/site/createNewSite",
        data: {
          pageUrl,
          pageId,
          name,
          profile,
          sitepath,
          isPublish
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (site.status === 200) {
        dispatch({ type: "CREATE_NEW_SITE_SUCCESS", payload: site.data });
        toastr.success(`Create new site ${name} success`, "Sucess");
        return true;
      } else {
        toastr.error(`Create new site ${site.error} failed`, "Error");
      }
      return true;
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (error && error.response) {
        toastr.error(`${error.response.data.error}`, "Error");
      } else {
        toastr.error(`Create new site ${name} failed`, "Error");
      }
      return true;
    }
  };
}

export function activateUser({ userId }) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "PATCH",
        url: `/user/activate/${userId}`
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({ type: "SET_USER_ACTIVATED", payload: userId });
        toastr.success(`User acitvated`, "Sucess");
      } else {
        toastr.error(`Activation failed`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Activation failed`, "Error");
      return true;
    }
  };
}

export function deactivateUser({ userId }) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "PATCH",
        url: `/user/deactivate/${userId}`
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({ type: "SET_USER_DEACTIVATED", payload: userId });
        toastr.success(`User deacitvated`, "Sucess");
      } else {
        toastr.error(`Deactivation failed`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Deactivation failed`, "Error");
    }
  };
}
