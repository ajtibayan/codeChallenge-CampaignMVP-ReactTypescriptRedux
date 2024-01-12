import { CampaignDetails } from "@store/slices/campaignDetailsSlice";

// Utility function that returns an array of numbers for the specified metric
// derived from the history object
export const setGraph = (
  inputArr: [CampaignDetails[]],
  idx: number,
  metric: string
): number[] => {
  return inputArr.map((arr) => arr[idx][metric as keyof CampaignDetails]);
};
