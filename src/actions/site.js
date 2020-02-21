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

export const getAllSite = () => {
  return async dispatch => {
    const data = await axios({
      url: "/site/findAll"
      // params: {
      //   access_token: accessToken,
      //   id: id
      // }
    });
    dispatch({
      type: "GET_ALL_SITE",
      payload: data.data
    });
  };
};

export function createNewSite({
  pageUrl,
  pageId,
  accessToken,
  color,
  fontBody,
  fontTitle,
  navItems
}) {
  return async dispatch => {
    const data = await axios({
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
    if (data.status !== 500) {
      dispatch({
        type: "CREATE_NEW_SITE",
        payload: data.data
      });
      toastr.success("Your new site has been create.", "Success");
    } else {
      toastr.error(
        "There are something wrong when you create website. Please try again.",
        "Fail"
      );
    }
  };
}

export function saveDesignSite({
  pageId,
  color,
  fontBody,
  fontTitle,
  logo,
  navItems
}) {
  return async dispatch => {
    const data = await axios({
      method: "POST",
      url: "/site/update",
      params: {
        id: pageId
      },
      data: {
        fontTitle,
        fontBody,
        color,
        logo,
        navItems
      }
    });
    if (data.status === 200) {
      dispatch({
        type: "EDIT_SITE",
        payload: data.data
      });
      toastr.success("Your new site has been create.", "Success");
    } else {
      toastr.error(
        "There are something wrong when you create website. Please try again.",
        "Fail"
      );
    }
  };
}
