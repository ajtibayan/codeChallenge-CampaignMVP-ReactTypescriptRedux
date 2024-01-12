import { Box } from "@mui/system";
import { ReactNode } from "react";
import ListDrawer from "@components/ListDrawer/ListDrawer";

interface SidebarProps {
  mobileOpen: boolean;
  drawerWidth: number;
  drawerToggle: () => void;
  children: ReactNode;
}

const SidebarDrawer: React.FC<SidebarProps> = ({
  mobileOpen,
  drawerWidth,
  drawerToggle,
  children,
}) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Campaign List"
    >
      <ListDrawer
        mOpen={mobileOpen}
        drawerWidth={drawerWidth}
        selectedVariant="temporary"
        dToggle={drawerToggle}
      >
        {children}
      </ListDrawer>
      <ListDrawer
        mOpen={mobileOpen}
        drawerWidth={drawerWidth}
        selectedVariant="permanent"
        dToggle={drawerToggle}
      >
        {children}
      </ListDrawer>
    </Box>
  );
};
export default SidebarDrawer;
