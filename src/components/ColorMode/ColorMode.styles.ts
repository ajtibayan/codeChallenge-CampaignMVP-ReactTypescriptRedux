import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const ColorModeContainer = styled(Box)({
  display: "flex",
  position: "fixed",
  top: "60px",
  right: "5px",
  width: "140px",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.default",
  color: "text.primary",
  borderRadius: 1,
  zIndex: 1,
});
