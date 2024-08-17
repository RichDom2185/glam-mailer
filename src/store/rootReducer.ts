import { combineReducers } from "@reduxjs/toolkit";
import draftsReducer from "./reducers/draftsReducer";

export const rootReducer = combineReducers({
  drafts: draftsReducer,
});
