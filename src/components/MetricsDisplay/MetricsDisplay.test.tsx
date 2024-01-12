import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import MetricsDisplay from "./MetricsDisplay";

describe("Metrics display test", () => {
  test("initial render", async () => {
    const metric = 1000;
    const metricTtl = 1405;
    const metricType = "impressions";

    renderWithProviders(
      <MetricsDisplay
        metric={metric}
        metricTtl={metricTtl}
        metricType={metricType}
      />
    );

    expect(screen.getByTestId("metric-title-current")).toHaveTextContent(
      /Current Impressions/i
    );
    expect(
      screen.getByRole("heading", { name: /1000/i, level: 6 })
    ).toBeInTheDocument();
    expect(screen.getByTestId("metric-title-total")).toHaveTextContent(
      /Total Impressions/i
    );
    expect(
      screen.getByRole("heading", { name: /1405/i, level: 6 })
    ).toBeInTheDocument();
  });
});
