/* eslint-disable testing-library/no-debugging-utils */
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Home from "./Home";

describe("Home Page Tests", () => {
  test("initial render", async () => {
    renderWithProviders(<Home />);

    screen.debug();

    expect(
      await screen.findByRole("button", { name: /Red/i })
    ).toBeInTheDocument();
  });
});
