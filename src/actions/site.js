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
      dispatch({
        type: "SET_USER_SITES",
        payload: req.data.sites
      });
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

export function changeHomeItems(items) {
  return dispatch => {
    dispatch({
      type: "CHANGE_HOME_ITEMS",
      payload: items
    });
  };
}

export function saveDesignSite({
  logo,
  cover,
  site,
  youtube,
  sitepath,
  instagram,
  whatsapp,
  email,
  phone
}) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      if (logo && typeof logo === "object" && logo.size > 0) {
        dispatch(uploadLogo(logo, site));
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
          sitePath: sitepath,
          youtube,
          instagram,
          whatsapp,
          email,
          phone
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
      console.log(data);
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
        url: "/site/saveHomePageImage",
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

export function changeSiteSitepath(sitepath) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_SITEPATH",
      payload: sitepath
    });
  };
}

export function changeSiteWhatsapp(whatsapp) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_WHATSAPP",
      payload: whatsapp
    });
  };
}

export function changeSiteInstagram(instagram) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_INSTAGRAM",
      payload: instagram
    });
  };
}

export function changeSiteYoutube(youtube) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_YOUTUBE",
      payload: youtube
    });
  };
}

export function changeSiteEmail(email) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_EMAIL",
      payload: email
    });
  };
}

export function changeSitePhone(phone) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_PHONE",
      payload: phone
    });
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

export function changeHomeItemName(site) {
  return dispatch => {
    dispatch({
      type: "CHANGE_HOME_ITEM_NAME",
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

export function getAbout(sitepath) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: `/site/find/${sitepath}/about`
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_SITEVIEW_ABOUT",
          payload: data.data[0].about
        });
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Get site data failed!", "Error");
    }
  };
}

export function getPosts(sitepath) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: "/site/findByTab",
        params: {
          sitePath: sitepath,
          page: "news"
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      console.log(data);
      if (data.status === 200) {
        dispatch({
          type: "SET_SITEVIEW_NEWS",
          payload: data.data.posts
        });
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Get site data failed!", "Error");
    }
  };
}

export function getEvents(sitepath) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: `/site/find/${sitepath}/event`
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_SITEVIEW_EVENT",
          payload: data.data[0].events
        });
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Get site data failed!", "Error");
    }
  };
}

export function getGalleries(sitepath) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "get",
        url: `/site/find/${sitepath}/gallery`
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_SITEVIEW_GALLERIES",
          payload: data.data[0].galleries
        });
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error("Get site data failed!", "Error");
    }
  };
}
