import { combineReducers } from "redux";
import site from "./site";
import theme from "./theme";
import user from "./user";
import tab from "./tab";
import imageUrl from "./image";
import dialog from "./dialog";
import spinner from "./spinner";
import adminTab from "./adminTab";
import admin from "./admin";
import path from "./path";
import post from "./post";
import snackBar from "./snackbar";
import syncdata from "./syncdata";

export default combineReducers({
  site,
  theme,
  user,
  tab,
  imageUrl,
  dialog,
  spinner,
  adminTab,
  admin,
  path,
  post,
  snackBar,
  syncdata
});
