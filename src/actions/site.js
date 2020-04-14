import toastr from "toastr";
import axios from "../utils/axios";
import { firebase } from "../utils/firebase";

function revertSaveData(modDat) {
  if (!modDat.posts) {
    modDat.posts = [];
  }
  if (!modDat.galleries) {
    modDat.galleries = [];
  }
  if (!modDat.events) {
    modDat.events = [];
  }

  modDat.posts.sort((a, b) => {
    return new Date(a.createdTime).getTime() -
      new Date(b.createdTime).getTime()
  }).reverse();

  modDat.galleries.sort((a, b) => {
    return new Date(a.createdTime).getTime() -
      new Date(b.createdTime).getTime()
  }).reverse();

  modDat.events.sort((a, b) => {
    return new Date(a.startTime).getTime() -
      new Date(b.startTime).getTime()
  }).reverse();

  for (let i = 0; i < modDat.homepage.length; i++) {
    if (!modDat.homepage[i].filter.items) modDat.homepage[i].filter.items = [];
    let type = modDat.homepage[i].original;

    for (
      let index = 0;
      index < modDat.homepage[i].filter.items.length;
      index++
    ) {
      if (type === "news") {
        modDat.homepage[i].filter.items[index] = modDat.posts.filter(function (
          pos
        ) {
          return pos._id === modDat.homepage[i].filter.items[index];
        })[0];
      }
      if (type === "event") {
        modDat.homepage[i].filter.items[index] = modDat.events.filter(function (
          pos
        ) {
          return pos._id === modDat.homepage[i].filter.items[index];
        })[0];
      }
      if (type === "gallery") {
        modDat.homepage[i].filter.items[index] = modDat.galleries.filter(
          function (pos) {
            return pos._id === modDat.homepage[i].filter.items[index];
          }
        )[0];
      }
    }
    if (modDat.homepage[i].filter.items.length === 0)
      modDat.homepage[i].filter.items = null;
  }

  return modDat;
}

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

export function changeColor(color) {
  return dispatch => {
    dispatch({
      type: "CHANGE_COLOR",
      payload: color
    });
  };
}

export function changeFontTitle(fontTitle) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_TITLE",
      payload: fontTitle
    });
  };
}

export function changeFontBody(fontBody) {
  return dispatch => {
    dispatch({
      type: "CHANGE_FONT_BODY",
      payload: fontBody
    });
  };
}

export function changeNavItems(navItems) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEMS",
      payload: navItems
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
  phone,
  posts,
  address
}) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      let logoURL = undefined;
      let coverURL = undefined;
      const uploadLogoAction = await uploadLogo(logo, site);
      if (uploadLogoAction) {
        logoURL = uploadLogoAction;
        site.logo = uploadLogoAction;
        dispatch({
          type: "UPLOAD_LOGO",
          payload: site.logo
        });
      }
      const uploadCoverAction = await uploadCover(cover, site);
      if (uploadCoverAction) {
        coverURL = uploadCoverAction;
      }

      let saveDat = site.homepage;

      for (let i = 0; i < saveDat.length; i++) {
        if (!saveDat[i].filter.items) saveDat[i].filter.items = [];
        for (let index = 0; index < saveDat[i].filter.items.length; index++) {
          saveDat[i].filter.items[index] = saveDat[i].filter.items[index]._id;
        }
        if (saveDat[i].filter.items.length === 0) {
          saveDat[i].filter.items = null;
          saveDat[i].filter.type = "latest";
        }
      }

      await axios({
        method: "PATCH",
        url: "post/activePosts",
        data: {
          posts: posts
        }
      });
      console.log(site.limitNews);
      const data = await axios({
        method: "patch",
        url: "/site/saveDesign",
        data: {
          fontBody: site.fontBody,
          fontTitle: site.fontTitle,
          navItems: site.navItems,
          theme: site.theme._id,
          pageId: site.id,
          name: site.title,
          color: site.color,
          sitePath: sitepath,
          youtube,
          instagram,
          whatsapp,
          email,
          phone,
          homepage: saveDat,
          logoURL,
          coverURL,
          address,
          showDesEvent: site.showDetailSetting.showDesEvent,
          showPlaceEvent: site.showDetailSetting.showPlaceEvent,
          showCoverEvent: site.showDetailSetting.showCoverEvent,
          about: site.about,
          limitNews: site.limitNews,
          limitEvent: site.limitEvent,
          limitGallery: site.limitGallery,
          showAboutDescription: site.showDetailSetting.showAboutDescription,
          showAboutLogo: site.showDetailSetting.showAboutLogo,
          showStory: site.showDetailSetting.showStory,
          latitude: site.latitude,
          longitude: site.longitude
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        revertSaveData(site);
        dispatch({
          type: "SET_ISCHANGED_FALSE"
        });
        toastr.success(`Save site ${site.title} sucess`, "Success");
      } else {
        toastr.error("There are something wrong when save your site", "Error");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "CLOSE_LOADING"
      });
      dispatch({
        type: "SET_ISCHANGED_FALSE"
      });
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "SET_LOGOUT"
        });
      }
      if (error.response && error.response.data) {
        dispatch({
          type: "SET_ISCHANGED_FALSE"
        });
        if (error.response.data.msg) {
          toastr.error(error.response.data.msg, "Error");
        } else toastr.error(error.response.data.error, "Error");
      } else {
        dispatch({
          type: "SET_ISCHANGED_FALSE"
        });
        toastr.error("There are something wrong when save your site", "Error");
      }
    }
  };
}

export function changeTheme(theme) {
  return dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    dispatch({
      type: "CHANGE_THEME",
      payload: theme
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
        return revertSaveData(data.data);
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
  return new Promise(async (resolve, reject) => {
    try {
      if (file && typeof file === "object" && file.size > 0) {
        firebase
          .storage()
          .ref()
          .child(`${site.id}`)
          .put(file, {
            contentType: "image/jpeg"
          })
          .then(async () => {
            firebase
              .storage()
              .ref()
              .child(`${site.id}`)
              .getDownloadURL()
              .then(async url => {
                resolve(url);
              });
          })
          .catch(error => {
            console.log("upload: ", error);
            toastr.error(`Upload new logo failed`, "Error");
            resolve(false);
          });
      } else resolve(false);
    } catch (error) {
      toastr.error(`Upload new logo failed`, "Error");
      resolve(false);
    }
  });
}

export async function uploadCover(covers, site) {
  return new Promise(async (resolve, reject) => {
    try {
      let coversUrl = [];
      if (covers && covers.length > 0) {
        // map array to promises
        const promises = covers.map(async cover => {
          if (typeof cover === "string") {
            coversUrl.push(cover);
          } else {
            await firebase
              .storage()
              .ref(`${site.id}/`)
              .child(cover.name)
              .put(cover, {
                contentType: "image/jpeg"
              })
              .then(async () => {
                await firebase
                  .storage()
                  .ref(`${site.id}/`)
                  .child(cover.name)
                  .getDownloadURL()
                  .then(url => {
                    coversUrl.push(url);
                  });
              })
              .catch(error => {
                console.log("upload: ", error);
                toastr.error(`Upload cover failed`, "Error");
                resolve(false);
              });
          }
        });
        // wait until all promises are resolved
        await Promise.all(promises);
        resolve(coversUrl);
      } else {
        resolve([]);
      }
    } catch (error) {
      toastr.error(`Upload cover failed`, "Error");
      resolve(false);
    }
  });
}

export function setPreviewMode(bool) {
  return dispatch => {
    dispatch({
      type: "SET_PREVIEW_MODE",
      payload: bool
    });
  };
}

export function setFramePreview(mode) {
  return dispatch => {
    dispatch({
      type: "SET_FRAME_PREVIEW_MODE",
      payload: mode
    });
  };
}

export function changeSiteAbout(about) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_ABOUT",
      payload: about
    });
  };
}

export function changeSiteTitle(title) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_TITLE",
      payload: title
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

export function changeSiteAddress(address) {
  return dispatch => {
    dispatch({
      type: "CHANGE_SITE_ADDRESS",
      payload: address
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

export function changeNavItemName(item) {
  return dispatch => {
    dispatch({
      type: "CHANGE_NAV_ITEM_NAME",
      payload: item
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
        url: "/site/findByTab",
        params: {
          sitePath: sitepath,
          page: "gallery"
        }
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

export function setIsChanged() {
  return dispatch => {
    dispatch({
      type: "SET_ISCHANGED_FALSE"
    });
  };
}

export function setEventCustomize(cover, description, place) {
  return dispatch => {
    dispatch({
      type: "SET_EVENT_CUSTOMIZE",
      payload: {
        cover: cover,
        description: description,
        place: place
      }
    });
  };
}

export function setAboutCustomize(logo, description, story) {
  return dispatch => {
    dispatch({
      type: "SET_ABOUT_CUSTOMIZE",
      payload: {
        logo: logo,
        description: description,
        story: story
      }
    });
  };
}

export function setLimit(news, event, gallery) {
  return dispatch => {
    dispatch({
      type: "SET_LIMIT",
      payload: {
        news: news,
        event: event,
        gallery: gallery
      }
    });
  };
}

export function setLatLng(lat, lng) {
  return dispatch => {
    dispatch({
      type: "SET_LATLNG",
      payload: {
        lat: lat,
        lng: lng
      }
    });
  };
}