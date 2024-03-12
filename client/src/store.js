import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./redux/reducers/todoReducer";
import loaderReducer from "./redux/reducers/loaderReducer";

export default configureStore({
  reducer: {
    todo: todoReducer,
    loader: loaderReducer
  },
});