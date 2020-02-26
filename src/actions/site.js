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

export const unPublishSite = ({ siteId, siteName }) => {
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
      toastr.success(`Unpublish site ${siteName} success`, "Sucess");
    } else {
      toastr.error(
        "There are something wrong when unpublish your site",
        "Error"
      );
    }
  };
};

export const publishSite = ({ siteId, siteName }) => {
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
      toastr.success(`Publish site ${siteName} sucess`, "Success");
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
        theme: site.theme.id,
        pageId: site.id,
        name: site.title,
        color: site.color
      }
    });
    if (data.status === 200) {
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

export function getSiteById(id) {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: "/site/find/" + id
    });
    if (data.status === 200) {
      return data.data;
    }
  };
}

export function setSiteEdit(data, titleStyle, bodyStyle) {
  return async dispatch => {
    dispatch({
      type: "SET_SITE_EDIT",
      payload: {
        data: data,
        titleEdit: titleStyle,
        bodyEdit: bodyStyle
      }
    });
  };
}

export function setSiteView(data, titleStyle, bodyStyle) {
  return async dispatch => {
    dispatch({
      type: "SET_SITE_VIEW",
      payload: {
        data: data,
        titleView: titleStyle,
        bodyView: bodyStyle
      }
    });
  };
}

export function setCurrentEditId(id) {
  return dispatch => {
    dispatch({
      type: "SET_CURRENT_EDIT_ID",
      payload: id
    });
  };
}

export function setActiveNavItems(site) {
  return dispatch => {
    dispatch({
      type: "SET_ACTIVE_NAV_ITEMS",
      payload: site
    });
  };
}
