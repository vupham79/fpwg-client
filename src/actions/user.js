import axios from "../utils/axios";

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

export function getUserPages(accessToken) {
  return async dispatch => {
    const data = await axios({
      url: "/facebook/pages",
      params: {
        access_token: accessToken
      }
    });
    dispatch({
      type: "SET_USER_PAGES",
      payload: data.data
    });
  };
}

export function confirmPage({
  pageUrl,
  pageId,
  accessToken,
  color,
  fontBody,
  fontTitle,
  navItems
}) {
  return async dispatch => {
    await axios({
      method: "POST",
      url: "/facebook/confirmPage",
      data: {
        pageUrl,
        pageId,
        accessToken,
        color,
        fontBody,
        fontTitle,
        navItems
      }
    });
  };
}
