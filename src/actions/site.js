import toastr from "toastr";
import axios from "../utils/axios";
import { firebase } from "../utils/firebase";

export function getAllSites() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/site/findAll"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_SITES",
          payload: data.data
        });
      } else {
        toastr.error(`Unable to retrieve sites`, "Error");
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
      toastr.error(error, "Error");
    }
  };
}

export function getUserSites() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const req = await axios({
        url: "/site/findAllByUser"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (req.status === 200) {
        dispatch({
          type: "SET_USER_SITES",
          payload: req.data.sites
        });
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
    }
  };
}

export const updateSiteId = currentId => {
  return dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    dispatch({
      type: "UPDATE_SITE_ID",
      payload: currentId
    });
    dispatch({
      type: "CLOSE_LOADING"
    });
  };
};

export const unPublishSiteAdmin = ({ siteId, siteName }) => {
  return async dispatch => {
    try {
      dispatch({
        type: "SHOW_LOADING"
      });
      const data = await axios({
        method: "patch",
        url: "/site/publish",
        data: {
          id: siteId,
          isPublish: false
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "UNPUBLISH_SITE_ADMIN",
          payload: siteId
        });
        toastr.success(`Unpublish site ${siteName} success`, "Sucess");
      } else {
        toastr.error(
          "There are something wrong when unpublish your site",
          "Error"
        );
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
      toastr.error(
        "There are something wrong when unpublish your site",
        "Error"
      );
    }
  };
};

export const publishSiteAdmin = ({ siteId, siteName }) => {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/publish",
        data: {
          id: siteId,
          isPublish: true
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "PUBLISH_SITE_ADMIN",
          payload: siteId
        });
        toastr.success(`Publish site ${siteName} sucess`, "Success");
      } else {
        toastr.error(
          "There are something wrong when publish your site",
          "Error"
        );
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
      toastr.error("There are something wrong when publish your site", "Error");
    }
  };
};

export const unPublishSite = ({ siteId, siteName }) => {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/publish",
        data: {
          id: siteId,
          isPublish: false
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
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
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(
        "There are something wrong when unpublish your site",
        "Error"
      );
    }
  };
};

export const publishSite = ({ siteId, siteName }) => {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/publish",
        data: {
          id: siteId,
          isPublish: true
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "PUBLISH_SITE",
          payload: siteId
        });
        toastr.success(`Publish site ${siteName} sucess`, "Success");
      } else {
        toastr.error(
          "There are something wrong when publish your site",
          "Error"
        );
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

export function saveDesignSite({ logo, cover, favicon, site, metas }) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      if (logo && typeof logo === "object" && logo.size > 0) {
        dispatch(uploadLogo(logo, site));
      }
      if (favicon && typeof favicon === "object" && favicon.size > 0) {
        dispatch(uploadFavicon(favicon, site));
      }
      dispatch(uploadCover(cover, site));
      const data = await axios({
        method: "patch",
        url: "/site/saveDesign",
        data: {
          fontBody: site.fontBody,
          fontTitle: site.fontTitle,
          navItems: site.navItems,
          theme: site.theme.id,
          pageId: site.id,
          name: site.title,
          color: site.color,
          email: site.email,
          youtube: site.youtube,
          instagram: site.instagram,
          whatsapp: site.whatsapp,
          phone: site.phone,
          metas: metas
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        toastr.success(`Save site ${site.title} sucess`, "Success");
      } else {
        toastr.error("There are something wrong when save your site", "Error");
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
      toastr.error("There are something wrong when save your site", "Error");
    }
  };
}

export function changeTheme(site) {
  return dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    dispatch({
      type: "CHANGE_THEME",
      payload: site
    });
    dispatch({
      type: "CLOSE_LOADING"
    });
  };
}

export function getSiteById(id) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: "/site/find/",
        params: {
          id: id
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        return data.data;
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
      toastr.error("Get site data failed!", "Error");
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

export function setNewLogo(file) {
  return dispatch => {
    dispatch({
      type: "SET_NEW_LOGO",
      payload: file
    });
  };
}

export function setNewFavicon(file) {
  return dispatch => {
    dispatch({
      type: "SET_NEW_FAVICON",
      payload: file
    });
  };
}

export function setNewMetas(metas) {
  return dispatch => {
    dispatch({
      type: "SET_NEW_METAS",
      payload: metas
    });
  };
}

export function setNewCover(file) {
  return dispatch => {
    dispatch({
      type: "SET_NEW_COVER",
      payload: file
    });
  };
}

export function removeCover(cover) {
  return dispatch => {
    dispatch({
      type: "REMOVE_COVER",
      payload: cover
    });
  };
}

export function uploadLogo(file, site) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      firebase
        .storage()
        .ref()
        .child(`${site.id}`)
        .put(file, {
          contentType: "image/jpeg"
        })
        .then(async () => {
          await firebase
            .storage()
            .ref()
            .child(`${site.id}`)
            .getDownloadURL()
            .then(async url => {
              await axios({
                method: "PATCH",
                url: "/site/logo",
                data: {
                  logo: url,
                  id: site.id
                }
              });
              site.logo = url;
              dispatch({
                type: "UPLOAD_LOGO",
                payload: site
              });
            });
          dispatch({
            type: "CLOSE_LOADING"
          });
        })
        .catch(error => {
          console.log("upload: ", error);
          dispatch({
            type: "CLOSE_LOADING"
          });
          toastr.error(`Upload new logo failed`, "Error");
        });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Upload new logo failed`, "Error");
    }
  };
}

export function uploadCover(covers, site) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      let coversUrl = [];
      if (covers && covers.length > 0) {
        for (let index = 0; index < covers.length; index++) {
          if (typeof covers[index] === "string") {
            coversUrl.push(covers[index]);
          } else {
            await firebase
              .storage()
              .ref(`${site.id}/`)
              .child(covers[index].name)
              .put(covers[index], {
                contentType: "image/jpeg"
              })
              .then(async () => {
                await firebase
                  .storage()
                  .ref(`${site.id}/`)
                  .child(covers[index].name)
                  .getDownloadURL()
                  .then(async url => {
                    coversUrl.push(url);
                  });
              })
              .catch(error => {
                console.log("upload: ", error);
                dispatch({
                  type: "CLOSE_LOADING"
                });
                toastr.error(`Upload cover failed`, "Error");
              });
          }
        }
      } else {
        coversUrl = null;
      }
      await axios({
        method: "PATCH",
        url: "site/saveHomePageImage",
        data: {
          cover: coversUrl,
          pageId: site.id
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Upload cover failed`, "Error");
    }
  };
}

export function setPreviewMode(bool) {
  return dispatch => {
    dispatch({
      type: "SET_PREVIEW_MODE",
      payload: bool
    });
  };
}

export function changeSiteTitle(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_TITLE",
      payload: site
    });
  };
}

export function changeSiteLinks(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_LINKS",
      payload: site
    });
  };
}

export function syncDataFromFB(pageId) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "patch",
        url: "/site/syncData",
        data: {
          pageId: pageId,
          lastSync: new Date()
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        toastr.success("You fetch data from FB success.", "Success");
      } else {
        toastr.error(
          "There are something wrong when fetch data from your FB",
          "Error"
        );
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
      toastr.error(
        "There are something wrong when fetch data from your FB",
        "Error"
      );
    }
  };
}

export function setEditOn() {
  return dispatch => {
    dispatch({
      type: "SET_EDIT_ON"
    });
  };
}

export function setEditOff() {
  return dispatch => {
    dispatch({
      type: "SET_EDIT_OFF"
    });
  };
}

export function clearSiteView() {
  return dispatch => {
    dispatch({
      type: "CLEAR_SITE_VIEW"
    });
  };
}

export function getSiteBySitepath(sitepath) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: "/site/find/" + sitepath
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Get site data failed!", "Error");
    }
  };
}

export function setNavItemInActive() {
  return async dispatch => {
    dispatch({
      type: "SET_NAV_ITEM_INACTIVE"
    });
  };
}

export function setNavItemActive() {
  return async dispatch => {
    dispatch({
      type: "SET_NAV_ITEM_ACTIVE"
    });
  };
}

export function changeNavItemName(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEM_NAME",
      payload: site
    });
  };
}

export function uploadFavicon(file, site) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      firebase
        .storage()
        .ref()
        .child(`${site.id}_favicon`)
        .put(file, {
          contentType: "image/jpeg"
        })
        .then(async () => {
          await firebase
            .storage()
            .ref()
            .child(`${site.id}_favicon`)
            .getDownloadURL()
            .then(async url => {
              await axios({
                method: "PATCH",
                url: "/site/favicon",
                data: {
                  favicon: url,
                  id: site.id
                }
              });
              site.favicon = url;
              dispatch({
                type: "UPLOAD_FAVICON",
                payload: site
              });
            });
          dispatch({
            type: "CLOSE_LOADING"
          });
        })
        .catch(error => {
          console.log("upload: ", error);
          dispatch({
            type: "CLOSE_LOADING"
          });
          toastr.error(`Upload new favicon failed`, "Error");
        });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Upload new favicon failed`, "Error");
    }
  };
}
