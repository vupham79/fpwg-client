import { closeCreateNewSite, openCreateNewSite } from "./dialog";
import { getImageUrl } from "./image";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeNavItems,
  changeTheme,
  getAllSites,
  getSiteById,
  getUserSites,
  publishSite,
  saveDesignSite,
  setActiveNavItems,
  setCurrentEditId,
  setSiteEdit,
  setSiteView,
  unPublishSite,
  updateSiteId,
  publishSiteAdmin,
  unPublishSiteAdmin,
} from "./site";
import { closeLoading, showLoading } from "./spinner";
import { updateNavItemValue, updateTabValue } from "./tab";
import { getAllThemes, getAllThemesAdmin, getNavItems, setShowCustomColor } from "./theme";
import { confirmPage, getUserPages, login, setLogout, getAllUsers, activateUser, deactivateUser } from "./user";
import { updateAdminTabIndex } from "./adminTab";

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
  closeCreateNewSite,
  openCreateNewSite,
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
  activateUser,
  deactivateUser,
  getAllThemesAdmin,
  publishSiteAdmin,
  unPublishSiteAdmin,
};
