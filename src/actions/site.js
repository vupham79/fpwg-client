import axios from "../utils/axios";
import toastr from "toastr";

export const updateSiteId = currentId => {
  return dispatch => {
    dispatch({
      type: "UPDATE_SITE_ID",
      payload: currentId
    });
  };
};

export const publishSite = (id, isPublish) => {
  // return async dispatch => {
  //   const data = await axios({
  //     method: "post",
  //     url: "/site/delete",
  //     data: {
  //       id: id,
  //       isPublish: isPublish
  //     }
  //   });
  //   if (data.status === 200) {
  toastr.success("Your website has been publish", "Success");
  return dispatch => {
    dispatch({
      type: "PUBLISH_SITE",
      payload: {
        id,
        isPublish
      }
    });
  };
  //   } else {
  //     toastr.error("There are something wrong when publish your site", "Error");
  //   }
  // };
};

export const unPublishSite = (id, isPublish) => {
  // return async dispatch => {
  //   const data = await axios({
  //     method: "post",
  //     url: "/site/delete",
  //     data: {
  //       id: siteId
  //     }
  //   });

  //   if (data.status === 200) {
  toastr.success("Your site has been unpublish", "Success");
  return dispatch => {
    dispatch({
      type: "UNPUBLISH_SITE",
      payload: {
        id,
        isPublish
      }
    });
  };
  //   } else {
  //     toastr.error("There are something wrong when publish your site", "Error");
  //   }
  // };
};

export const getAllSite = (token, id) => {
  return async dispatch => {
    const data = await axios({
      url: "/site/findAllByUser",
      params: {
        accessToken: token,
        userId: id
      }
    });
    if (data.data) {
      dispatch({
        type: "GET_ALL_SITE",
        payload: data.data
      });
    }
  };
};

export function changeColor(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_COLOR",
      payload: site
    });
  };
}

export function changeFontTitle(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_TITLE",
      payload: site
    });
  };
}

export function changeFontBody(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_BODY",
      payload: site
    });
  };
}

export function setSiteIsEdit(isEdit, site) {
  return dispatch => {
    dispatch({
      type: "SET_SITE_IS_EDIT",
      payload: {
        isEdit,
        site
      }
    });
  };
}

export function changeNavItems(items) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEMS",
      payload: items
    });
  };
}
