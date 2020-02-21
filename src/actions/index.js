import {
  updateSiteId,
  unPublishSite,
  publishSite,
  getAllSite,
  createNewSite
} from "./site";
import {
  changeTheme,
  changeFontBody,
  changeFontTitle,
  changeColor,
  setShowCustomColor,
  changeNavItems,
  getNavItems
} from "./theme";
import { setEdit, setLogout, login, getUserPages } from "./user";
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
  setEdit,
  updateNavItemValue,
  showLoading,
  closeLoading,
  login,
  //dialog
  closeCreateNewSite,
  openCreateNewSite,
  createNewSite,
  changeNavItems,
  getNavItems,
  unPublishSite,
  publishSite,
  getAllSite
};
