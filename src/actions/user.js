import axios from "../utils/axios";
import toastr from "../component/Toastr";
export function login({ accessToken, profile }) {
  return async dispatch => {
    const data = await axios({
      method: "post",
      url: "/auth",
      data: {
        accessToken: accessToken,
        id: profile.id,
        name: profile.name,
        email: profile.email,
        picture: profile.picture.data.url
      }
    });

    if (data.status === 200) {
      dispatch({
        type: "SET_LOGIN",
        payload: {
          accessToken,
          profile
        }
      });
    }
  };
}

export function setLogout() {
  return dispatch => {
    dispatch({
      type: "SET_LOGOUT"
    });
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

export function getUserPages({ accessToken }) {
  return async dispatch => {
    const data = await axios({
      url: "/facebook/pages",
      params: {
        access_token: accessToken
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "SET_USER_PAGES",
        payload: data.data
      });
    } else {
    }
  };
}

export function confirmPage({ pageUrl, pageId, accessToken, name, profile }) {
  return async dispatch => {
    const site = await axios({
      method: "POST",
      url: "/site/createNewSite",
      data: {
        pageUrl,
        pageId,
        accessToken,
        name,
        userId: profile.id,
        profile
      }
    });
    if (site.status === 200) {
      dispatch({ type: "CREATE_NEW_SITE_SUCCESS", payload: site.data });
      toastr.success(`Create new site ${name} success`, "Sucess");
    } else {
      dispatch({
        type: "CREATE_NEW_SITE_FAIL"
      });
    }
  };
}
