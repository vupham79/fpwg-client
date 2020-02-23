import toastr from "toastr";
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
      toastr.success(`Unpublish site ${siteId} success`, "Sucess");
    } else {
      toastr.error(
        "There are something wrong when unpublish your site",
        "Error"
      );
    }
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
      toastr.success(`Publish site ${siteId} sucess`, "Success");
    } else {
      toastr.error("There are something wrong when publish your site", "Error");
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

export function saveDesignSite(site) {
  return async dispatch => {
    const data = await axios({
      method: "patch",
      url: "/site/saveDesign",
      data: {
        logo: site.logo,
        fontBody: site.fontBody,
        fontTitle: site.fontTitle,
        navItems: site.navItems,
        themeId: site.themeId,
        pageId: site.id,
        name: site.title,
        color: site.color
      }
    });
    if (data.status === 200) {
      // dispatch({
      //   type: "SAVE_DESIGN_SITE"
      // });
      toastr.success(`Save site ${site.title} sucess`, "Success");
    } else {
      toastr.error("There are something wrong when save your site", "Error");
    }
  };
}

export function changeTheme(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_THEME",
      payload: site
    });
  };
}
