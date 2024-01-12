import {
  MetricsSection,
  MetricsContainer,
  DetailValue,
} from "@components/MetricsDisplay/MetricsDisplay.styles";
import { Typography } from "@mui/material";

interface MetricsDisplayProps {
  metric: number;
  metricTtl: number;
  metricType: string;
}

// Component displays the campaign metrics, current and total, above each
// graph in the details card
const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  metric,
  metricTtl,
  metricType,
}) => {
  return (
    <MetricsSection component="section">
      <MetricsContainer component="div">
        <Typography variant="body2" data-testid="metric-title-current">
          Current {metricType}
        </Typography>
        <DetailValue variant="subtitle1">{metric}</DetailValue>
      </MetricsContainer>
      <MetricsContainer component="div">
        <Typography variant="body2" data-testid="metric-title-total">
          Total {metricType === "CTR" && "Average"} {metricType}
        </Typography>
        <DetailValue variant="subtitle1">{metricTtl}</DetailValue>
      </MetricsContainer>
    </MetricsSection>
  );
};
export default MetricsDisplay;
