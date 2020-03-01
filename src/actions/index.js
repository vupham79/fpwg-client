import { updateAdminTabIndex } from "./adminTab";
import { closeDialog, openDialog } from "./dialog";
import { getImageUrl } from "./image";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeNavItems,
  changeSiteTitle,
  changeTheme,
  getAllSites,
  getSiteById,
  getUserSites,
  publishSite,
  publishSiteAdmin,
  saveDesignSite,
  setActiveNavItems,
  setCurrentEditId,
  setSiteEdit,
  setSiteView,
  syncDataFromFB,
  unPublishSite,
  unPublishSiteAdmin,
  updateSiteId,
  uploadLogo
} from "./site";
import { closeLoading, showLoading } from "./spinner";
import { updateNavItemValue, updateTabValue } from "./tab";
import {
  getAllThemes,
  getAllThemesAdmin,
  getNavItems,
  setShowCustomColor
} from "./theme";
import {
  activateUser,
  confirmPage,
  deactivateUser,
  getAllUsers,
  getUserPages,
  login,
  setLogout
} from "./user";
import { getAllPost } from "./post";

export {
  getUserPages,
  updateSiteId,
  changeTheme,
  changeColor,
  changeFontTitle,
  changeFontBody,
  setShowCustomColor,
  setLogout,
  updateTabValue,
  getImageUrl,
  updateNavItemValue,
  showLoading,
  closeLoading,
  login,
  //dialog
  closeDialog,
  openDialog,
  changeNavItems,
  getNavItems,
  unPublishSite,
  publishSite,
  confirmPage,
  getAllThemes,
  getUserSites,
  saveDesignSite,
  getSiteById,
  setSiteEdit,
  setSiteView,
  setCurrentEditId,
  setActiveNavItems,
  updateAdminTabIndex,
  getAllUsers,
  getAllSites,
  uploadLogo,
  activateUser,
  deactivateUser,
  changeSiteTitle,
  syncDataFromFB,
  getAllThemesAdmin,
  publishSiteAdmin,
  unPublishSiteAdmin,
  getAllPost
};
