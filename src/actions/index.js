import { loginAdmin, setLogoutAdmin } from "./admin";
import { updateAdminTabIndex } from "./adminTab";
import { getAllPaths } from "./path";
import { getAllPost, setActivePost } from "./post";
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
import { closeDialog, openDialog } from "./dialog";

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
  loginAdmin,
  setLogoutAdmin,
  getAllPaths,
  getAllPost,
  setActivePost
};
