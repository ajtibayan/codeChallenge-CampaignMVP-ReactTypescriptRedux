import { useCampaignSelector } from "../../store";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import DataTile from "@components/DataTile/DataTile";
import MetricsDisplay from "@components/MetricsDisplay/MetricsDisplay";
import { DashboardContainer, TilesContainer } from "./CampaignDashboard.styles";
import { setGraph } from "./CampaignDashboard.utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DashboardProps {
  cid?: number;
  name?: string;
}

// Component renders the Campaign Details section
const CampaignDashboard: React.FC<DashboardProps> = ({ cid = 0, name }) => {
  const [impressionsGraph, setImpressionsGraph] = useState([0]);
  const [clicksGraph, setClicksGraph] = useState([0]);
  const [usersGraph, setUsersGraph] = useState([0]);
  const [ctrGraph, setCtrGraph] = useState([0]);
  const [xaxis, setXaxis] = useState([0]);
  const { dataCur, dataTtl, history, count, isError } = useCampaignSelector(
    (state) => state.campaignDetails
  );

  useEffect(() => {
    setImpressionsGraph(setGraph(history, cid, "impressions"));
    setClicksGraph(setGraph(history, cid, "clicks"));
    setUsersGraph(setGraph(history, cid, "users"));
    setCtrGraph(setGraph(history, cid, "ctr"));

    if (count > 9) {
      setXaxis(history.map((data, index) => index + (count - 10)));
    } else {
      setXaxis(history.map((data, index) => index));
    }
  }, [cid, count, history]);

  if (isError) {
    toast.error("Error loading Campaign Details", { toastId: "error2" });
  }

  return (
    <DashboardContainer component="section">
      <Typography variant="h3" gutterBottom>
        {name} Campaign Details
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight={"bold"}>
        Current Number/Iteration: {count - 1}
      </Typography>
      <TilesContainer component="div">
        <DataTile
          dataName="Impressions"
          xaxis={xaxis}
          graphPts={impressionsGraph}
        >
          <MetricsDisplay
            metric={dataCur[cid].impressions}
            metricTtl={dataTtl[cid].impressionsTtl}
            metricType="Impressions"
          />
        </DataTile>
        <DataTile dataName="Clicks" xaxis={xaxis} graphPts={clicksGraph}>
          <MetricsDisplay
            metric={dataCur[cid].clicks}
            metricTtl={dataTtl[cid].clicksTtl}
            metricType="Clicks"
          />
        </DataTile>
        <DataTile dataName="Users" xaxis={xaxis} graphPts={usersGraph}>
          <MetricsDisplay
            metric={dataCur[cid].users}
            metricTtl={dataTtl[cid].usersTtl}
            metricType="Users"
          />
        </DataTile>
        <DataTile dataName="CTR" xaxis={xaxis} graphPts={ctrGraph}>
          <MetricsDisplay
            metric={parseFloat(dataCur[cid].ctr.toFixed(2))}
            metricTtl={
              parseFloat(
                (
                  (dataTtl[cid].clicksTtl / dataTtl[cid].impressionsTtl) *
                  100
                ).toFixed(2)
              ) || 0
            }
            metricType="CTR"
          />
        </DataTile>
      </TilesContainer>
    </DashboardContainer>
  );
};
export default CampaignDashboard;
