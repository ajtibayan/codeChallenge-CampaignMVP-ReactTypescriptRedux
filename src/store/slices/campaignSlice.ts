import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchCampaigns",
  async () => {
    // API call to get all available campaigns
    const response = await axios.get(import.meta.env.VITE_CAMPAIGNS_URL);

    return response.data.campaigns;
  }
);

export interface Campaign {
  id: number;
  name: string;
}

interface CampaignState {
  loading: boolean;
  data: Campaign[];
  isError: boolean;
}

const initialState: CampaignState = {
  loading: false,
  data: [],
  isError: false,
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampaigns.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCampaigns.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCampaigns.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const campaignsReducer = campaignSlice.reducer;
