import axios from "../utils/axios";

export function getUserSites(userId, accessToken) {
  return async dispatch => {
    const data = await axios({
      url: "/site/findAllByUser",
      params: {
        userId: userId,
        access_token: accessToken
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

export const publishSite = id => {
  return dispatch => {
    dispatch({
      type: "PUBLISH_SITE",
      payload: id
    });
  };
};

export const unPublishSite = ({ siteId }) => {
  return async dispatch => {
    const data = await axios({
      method: "post",
      url: "/site/delete",
      data: {
        id: siteId
      }
    });

    if (data.status === 200) {
      dispatch({
        type: "UNPUBLISH_SITE",
        payload: {
          siteId
        }
      });
    }
  };
};
