import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { campaignsReducer } from "./slices/campaignSlice";
import { campaignDetailsReducer } from "./slices/campaignDetailsSlice";

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  campaignDetails: campaignDetailsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
