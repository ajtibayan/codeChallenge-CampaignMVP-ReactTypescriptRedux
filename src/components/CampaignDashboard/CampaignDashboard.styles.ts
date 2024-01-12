import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const DashboardContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const TilesContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(500px, 1fr))",
  gap: "40px",
  height: "450px",
  width: "100%",
});
