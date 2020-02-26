import { updateAdminTabIndex } from "./adminTab";
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
  updateSiteId
} from "./site";
import { closeLoading, showLoading } from "./spinner";
import { updateNavItemValue, updateTabValue } from "./tab";
import { getAllThemes, getNavItems, setShowCustomColor } from "./theme";
import {
  confirmPage,
  getAllUsers,
  getUserPages,
  login,
  setLogout
} from "./user";

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
  getAllSites
};
