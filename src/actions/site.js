import axios from "../utils/axios";

export function getUserSites(userId, accessToken) {
  return async dispatch => {
    const data = await axios({
      url: "/site/findAllByUser",
      params: {
        userId: userId,
        accessToken: accessToken
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "SET_USER_SITES",
        payload: data.data
      });
    }
  };
}

export const updateSiteId = currentId => {
  return dispatch => {
    dispatch({
      type: "UPDATE_SITE_ID",
      payload: currentId
    });
  };
};

export const publishSite = siteId => {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/publish",
      data: {
        id: siteId,
        isPublish: true
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "PUBLISH_SITE",
        payload: siteId
      });
    }
  };
};

export const unPublishSite = siteId => {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/publish",
      data: {
        id: siteId,
        isPublish: false
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "UNPUBLISH_SITE",
        payload: siteId
      });
    }
  };
};
