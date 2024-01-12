import {
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ListDrawerProps {
  mOpen: boolean;
  drawerWidth: number;
  selectedVariant: "temporary" | "permanent" | "persistent" | undefined;
  dToggle: () => void;
  children: ReactNode;
}

// Component renders a fixed sidebar on desktop and sliding sidebar for mobile
const ListDrawer: React.FC<ListDrawerProps> = ({
  mOpen,
  drawerWidth,
  selectedVariant,
  dToggle,
  children,
}) => {
  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h5">Campaign List</Typography>
        <IconButton
          onClick={dToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            top: "8px",
            right: "10px",
            ":hover": {
              background: "none",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {children}
    </>
  );
  return (
    <>
      {selectedVariant === "temporary" ? (
        <Drawer
          variant="temporary"
          open={mOpen}
          onClose={dToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant={selectedVariant}
          sx={{
            width: drawerWidth,
            display: {
              xs: "none",
              sm: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};
export default ListDrawer;
