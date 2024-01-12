import { useCampaignSelector } from "../../store";
import { useEffect, useState } from "react";
import {
  CampaignDetails,
  CampaignDetailsTotals,
} from "../../store/slices/campaignDetailsSlice";
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

const metricsInit: CampaignDetails = {
  impressions: 0,
  clicks: 0,
  users: 0,
  ctr: 0,
};

const metricsTotalsInit: CampaignDetailsTotals = {
  impressionsTtl: 0,
  clicksTtl: 0,
  usersTtl: 0,
};

// Component renders the Campaign Details section
const CampaignDashboard: React.FC<DashboardProps> = ({ cid = 0, name }) => {
  // Use of local state to avoid momentary pending/loading of global state each time data
  // is refreshed during polling
  const [metrics, setMetrics] = useState(metricsInit);
  const [metricsTtl, setMetricsTtl] = useState(metricsTotalsInit);
  const [impressionsGraph, setImpressionsGraph] = useState([0]);
  const [clicksGraph, setClicksGraph] = useState([0]);
  const [usersGraph, setUsersGraph] = useState([0]);
  const [ctrGraph, setCtrGraph] = useState([0]);
  const [xaxis, setXaxis] = useState([0]);
  const { dataCur, dataTtl, history, count, isError } = useCampaignSelector(
    (state) => state.campaignDetails
  );

  useEffect(() => {
    if (dataCur.length > 0) {
      setMetrics(dataCur[cid]);
      setMetricsTtl(dataTtl[cid]);
      setImpressionsGraph(setGraph(history, cid, "impressions"));
      setClicksGraph(setGraph(history, cid, "clicks"));
      setUsersGraph(setGraph(history, cid, "users"));
      setCtrGraph(setGraph(history, cid, "ctr"));

      if (count > 9) {
        setXaxis(history.map((data, index) => index + (count - 10)));
      } else {
        setXaxis(history.map((data, index) => index));
      }
    }
  }, [cid, dataCur, dataTtl, count, history]);

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
            metric={metrics.impressions}
            metricTtl={metricsTtl.impressionsTtl}
            metricType="Impressions"
          />
        </DataTile>
        <DataTile dataName="Clicks" xaxis={xaxis} graphPts={clicksGraph}>
          <MetricsDisplay
            metric={metrics.clicks}
            metricTtl={metricsTtl.clicksTtl}
            metricType="Clicks"
          />
        </DataTile>
        <DataTile dataName="Users" xaxis={xaxis} graphPts={usersGraph}>
          <MetricsDisplay
            metric={metrics.users}
            metricTtl={metricsTtl.usersTtl}
            metricType="Users"
          />
        </DataTile>
        <DataTile dataName="CTR" xaxis={xaxis} graphPts={ctrGraph}>
          <MetricsDisplay
            metric={parseFloat(metrics.ctr.toFixed(2))}
            metricTtl={
              parseFloat(
                (
                  (metricsTtl.clicksTtl / metricsTtl.impressionsTtl) *
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
