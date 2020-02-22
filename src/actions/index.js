import {
  updateSiteId,
  unPublishSite,
  publishSite,
  getAllSite,
  changeFontBody,
  changeFontTitle,
  changeColor,
  setSiteIsEdit,
  changeNavItems
} from "./site";
import {
  changeTheme,
  setShowCustomColor,
  getNavItems,
  getAllThemes
} from "./theme";
import { setLogout, login, getUserPages, confirmPage } from "./user";
import { updateTabValue, updateNavItemValue } from "./tab";
import { getImageUrl } from "./image";
import { closeCreateNewSite, openCreateNewSite } from "./dialog";
import { closeLoading, showLoading } from "./spinner";

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
  getAllSite,
  confirmPage,
  getAllThemes,
  setSiteIsEdit
};
