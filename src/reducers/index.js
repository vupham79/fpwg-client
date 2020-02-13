import { combineReducers } from "redux";
import site from "./site";
import theme from "./theme";
import user from "./user";

export default combineReducers({
  site,
  theme,
  user
});
