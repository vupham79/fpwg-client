import { combineReducers } from "redux";
import site from "./site";
import theme from "./theme";
import user from "./user";
import tab from "./tab";
import imageUrl from "./image";
import dialog from "./dialog";
import spinner from "./spinner";
import adminTab from "./adminTab";
import post from "./post";

export default combineReducers({
  site,
  theme,
  user,
  tab,
  imageUrl,
  dialog,
  spinner,
  adminTab,
  post
});
