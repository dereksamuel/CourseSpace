import { combineReducers } from "redux";
import authenticate from "./authenticate";
import courses from "./courses";
import works from "./works";

export default combineReducers({
  authenticate,
  courses,
  works,
});
