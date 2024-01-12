import { configureStore } from "@reduxjs/toolkit";
import { campaignsReducer } from "./slices/campaignSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { campaignDetailsReducer } from "./slices/campaignDetailsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    campaignDetails: campaignDetailsReducer,
  },
});

const useCampaignDispatch: () => AppDispatch = useDispatch;
const useCampaignSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);

export { store, useCampaignDispatch, useCampaignSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
