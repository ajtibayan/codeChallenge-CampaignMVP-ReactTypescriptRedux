/* eslint-disable testing-library/no-unnecessary-act */
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import CampaignList from "./CampaignList";

describe("Campaign list tests", () => {
  test("displays correctly on initial load", async () => {
    const selectedCampaign = 0;
    const setCampaign = () => {
      return { cid: 0, name: "Red" };
    };

    renderWithProviders(
      <CampaignList
        selectedCampaign={selectedCampaign}
        setCampaign={setCampaign}
      />
    );

    await waitFor(async () => {
      expect(
        await screen.findByRole("button", { name: /Red/i })
      ).toBeInTheDocument();
    });
  });
});
