import { combineReducers } from "redux";
import site from "./site";
import theme from "./theme";

export default combineReducers({
  site,
  theme
});
