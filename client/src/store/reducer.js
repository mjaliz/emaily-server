import { combineReducers } from "redux";
import userReducer from "./authReducer";

export default combineReducers({
  user: userReducer,
});
