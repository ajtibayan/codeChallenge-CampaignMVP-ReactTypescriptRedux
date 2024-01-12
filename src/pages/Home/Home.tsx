import { useCampaignSelector, useCampaignDispatch } from "../../store";
import { fetchCampaignDetails } from "../../store/slices/campaignDetailsSlice";
import { useEffect, useState } from "react";
import CampaignDashboard from "@components/CampaignDashboard/CampaignDashboard";
import CampaignList from "@components/CampaignList/CampaignList";
import { HomeContainer, MainContainer } from "./Home.styles";
import FixedAppBar from "@components/FixedAppBar/FixedAppBar";
import SidebarDrawer from "@components/SidebarDrawer/SidebarDrawer";
import ColorMode from "@components/ColorMode/ColorMode";

export interface SelectedCampaign {
  cid: number;
  name: string;
}

const selectedCampaignInit = {
  cid: 0,
  name: "Red - CID(0)",
};

// Set width of Drawer/sidebar
const drawerWidth = 240;

// Component displays the Home/Main landing page of the app
const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<SelectedCampaign>(selectedCampaignInit);
  const { count } = useCampaignSelector((state) => state.campaignDetails);
  const campaignDetailsDispatch = useCampaignDispatch();

  useEffect(() => {
    let fetchInterval: NodeJS.Timeout;
    if (count === 0) {
      campaignDetailsDispatch(fetchCampaignDetails({ count: count }));
    } else {
      fetchInterval = setInterval(() => {
        campaignDetailsDispatch(fetchCampaignDetails({ count: count }));
      }, 5000);
    }
    return () => {
      clearInterval(fetchInterval);
    };
  }, [campaignDetailsDispatch, count]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <HomeContainer sx={{ mt: { xs: "4rem", sm: "0.5rem" } }}>
      <FixedAppBar
        drawerWidth={drawerWidth}
        drawerToggle={handleDrawerToggle}
      />
      <SidebarDrawer
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
        drawerToggle={handleDrawerToggle}
      >
        <CampaignList
          selectedCampaign={selectedCampaign.cid}
          setCampaign={setSelectedCampaign}
        />
      </SidebarDrawer>
      <MainContainer component="main" p={3}>
        <ColorMode />
        <CampaignDashboard {...selectedCampaign} />
      </MainContainer>
    </HomeContainer>
  );
};
export default Home;
