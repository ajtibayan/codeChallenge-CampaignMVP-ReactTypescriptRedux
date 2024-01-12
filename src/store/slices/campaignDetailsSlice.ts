import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Campaign } from "./campaignSlice";

export interface ThunkParams {
  count: number;
}

export interface CampaignDetailsArray {
  data: CampaignDetails[];
}

export const fetchCampaignDetails = createAsyncThunk(
  "campaigns/fetchCampaignDetails",
  async ({ count }: ThunkParams) => {
    const campaignsArr = await axios.get(import.meta.env.VITE_CAMPAIGNS_URL);

    // Create array of endpoints for all campaigns
    const endpoints = campaignsArr.data.campaigns.map(
      (obj: Campaign) =>
        `${import.meta.env.VITE_CAMPAIGNS_URL}/${obj.id}?number=${count}`
    );

    // Return array of campaign details for each campaign
    return await Promise.all(
      endpoints.map((endpoint: string) => axios.get(endpoint))
    ).then((data) =>
      data.map((obj) => {
        // Add CTR property to Campaign Details object derived from clicks and impressions data
        obj.data.ctr = (obj.data.clicks / obj.data.impressions) * 100;
        return obj.data;
      })
    );
  }
);

export interface CampaignDetails {
  impressions: number;
  clicks: number;
  users: number;
  ctr: number;
}

export interface CampaignDetailsTotals {
  impressionsTtl: number;
  clicksTtl: number;
  usersTtl: number;
}

interface CampaignDetailsState {
  loading: boolean;
  dataCur: CampaignDetails[];
  dataTtl: CampaignDetailsTotals[];
  history: [CampaignDetails[]];
  isError: boolean;
  count: number;
}

const initialState: CampaignDetailsState = {
  loading: true,
  dataCur: [],
  dataTtl: [],
  history: [[]],
  isError: false,
  count: 0,
};

const campaignDetailsSlice = createSlice({
  name: "campaignDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampaignDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCampaignDetails.fulfilled, (state, action) => {
      // Update Campaign Details global state object with array of campaign details for all available campaigns
      state.dataCur = action.payload;

      // This if block creates an array that keeps calculates and stores the totals for each metric
      // in the campaign details for all available campaigns so that the totals persist throughout
      // the life of the app
      if (state.dataTtl.length <= 1) {
        state.dataTtl = action.payload.map(() => {
          return {
            impressionsTtl: 0,
            clicksTtl: 0,
            usersTtl: 0,
          };
        });
      } else {
        state.dataTtl = action.payload.map((cd, idx) => {
          return {
            impressionsTtl: state.dataTtl[idx].impressionsTtl + cd.impressions,
            clicksTtl: state.dataTtl[idx].clicksTtl + cd.clicks,
            usersTtl: state.dataTtl[idx].usersTtl + cd.users,
          };
        });
      }

      // This if block creates and stores the campaign details for all available campaigns for the most recent
      // 10 iteration/ping of the API. This data is used to populate the line graphs for each metric in the
      // dashboard
      if (state.history[0].length > 0 && state.count > 1) {
        if (state.history.length > 9) {
          state.history.push([...action.payload]);
          state.history.shift();
        } else {
          state.history.push([...action.payload]);
        }
      } else {
        state.history[0] = [...action.payload];
      }

      state.loading = false;

      // Update and store the numbers of pings to the API during the life of the app
      state.count = state.count + 1;
    });
    builder.addCase(fetchCampaignDetails.rejected, (state) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const campaignDetailsReducer = campaignDetailsSlice.reducer;
