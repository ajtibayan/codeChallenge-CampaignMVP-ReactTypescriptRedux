import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useCampaignDispatch, useCampaignSelector } from "../../store";
import { fetchCampaigns } from "../../store/slices/campaignSlice";
import { useEffect } from "react";
import { SelectedCampaign } from "@pages/Home/Home";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CampaignListProps {
  selectedCampaign: number;
  setCampaign: (obj: SelectedCampaign) => void;
}

// Component renders list of campaigns and their cid's with data pull from API
const CampaignList: React.FC<CampaignListProps> = ({
  selectedCampaign,
  setCampaign,
}) => {
  const { data, loading, isError } = useCampaignSelector(
    (state) => state.campaigns
  );
  const campaignsDispatch = useCampaignDispatch();

  useEffect(() => {
    campaignsDispatch(fetchCampaigns());
  }, [campaignsDispatch]);

  const handleButtonClick = (e: { currentTarget: HTMLButtonElement }) => {
    setCampaign({
      cid: parseInt(e.currentTarget.value),
      name: e.currentTarget.textContent!,
    });
  };

  if (isError) {
    toast.error("Error loading Campaign List", { toastId: "error1" });
  }

  return (
    <List>
      {loading ? (
        "...Loading Campaign List"
      ) : (
        <>
          {data.map(({ id, name }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                component="button"
                value={id}
                onClick={handleButtonClick}
                selected={id === selectedCampaign}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#59a14f",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon>
                  <CampaignIcon />
                </ListItemIcon>
                <ListItemText primary={`${name} - CID(${id})`} />
              </ListItemButton>
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};
export default CampaignList;
