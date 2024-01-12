import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface AppBarProps {
  drawerWidth: number;
  drawerToggle: () => void;
}

// Component renders a fixed app bar on mobile screens starting at the 'sm'/764px break point
const FixedAppBar: React.FC<AppBarProps> = ({ drawerWidth, drawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        display: { sm: "none" },
        backgroundColor: "#eee",
        color: "#000",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={drawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Campaign List
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default FixedAppBar;
