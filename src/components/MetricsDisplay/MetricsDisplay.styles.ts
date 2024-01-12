import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

export const DetailValue = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  marginTop: "-0.8rem",
});

export const MetricsSection = styled(Box)({
  display: "flex",
  width: "100%",
  marginTop: "1.5rem",
});

export const MetricsContainer = styled(Box)({
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
});
