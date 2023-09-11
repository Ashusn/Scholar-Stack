import { configureStore } from "@reduxjs/toolkit";
import paperReducer from "./Slices/paperSlice";

export const store = configureStore({
  reducer: {
    paper: paperReducer,
  },
});
