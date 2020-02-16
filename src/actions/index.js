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
import { setEdit, setLogout, login } from "./user";
import { updateTabValue, updateNavItemValue } from "./tab";
import { getImageUrl } from "./image";
import { closeCreateNewSite, openCreateNewSite } from "./dialog";

export {
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
  openCreateNewSite
};
