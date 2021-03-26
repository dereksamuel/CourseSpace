import { combineReducers } from "redux";
import authenticate from "./authenticate";
import courses from "./courses";

export default combineReducers({
  authenticate,
  courses,
});
