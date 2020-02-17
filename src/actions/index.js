import { updateSiteId } from "./site";
import {
  changeTheme,
  changeFontBody,
  changeFontTitle,
  changeColor,
  setShowCustomColor,
  openLoading,
  closeLoading
} from "./theme";
import { setEdit, setLogout, login, getUserPages, confirmPage } from "./user";
import { updateTabValue, updateNavItemValue } from "./tab";
import { getImageUrl } from "./image";
import { closeCreateNewSite, openCreateNewSite } from "./dialog";

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
  openLoading,
  closeLoading,
  login,
  //dialog
  closeCreateNewSite,
  openCreateNewSite,
  confirmPage
};
