import { configureStore } from "@reduxjs/toolkit";
import user from "./redux/userSlice";
const combinedReducer = {
  user,
};

export default configureStore({
  reducer: combinedReducer,
});