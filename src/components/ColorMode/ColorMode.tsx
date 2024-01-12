import { useContext } from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../context/ColorModeContext";
import { ColorModeContainer } from "./ColorMode.styles";

// Component provides functionality to toggle between 'light' and 'dark' modes
// App automatically defaults to the users system preferred color mode
const ColorMode = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ColorModeContainer sx={{ top: { sm: "5px" } }}>
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </ColorModeContainer>
  );
};
export default ColorMode;
