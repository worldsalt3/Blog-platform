import { combineReducers } from "@reduxjs/toolkit";
import { blogApi } from "@/apis/BlogQuery";

export const reducers = combineReducers({
  [blogApi.reducerPath]: blogApi.reducer,
});
