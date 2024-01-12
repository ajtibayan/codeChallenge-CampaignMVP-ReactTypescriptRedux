import { Paper } from "@mui/material";
import { axisClasses, LineChart } from "@mui/x-charts";
import { ReactNode } from "react";

interface DataTileProps {
  dataName: string;
  xaxis: number[];
  graphPts: number[];
  children: ReactNode;
}

// Component accepts a specific metric type and data arrays for the specified metric
// and uses that data to render a line graph that shows the details of the 10 most
// recent iterations
const DataTile: React.FC<DataTileProps> = ({
  dataName,
  xaxis,
  graphPts,
  children,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translate(-25px, 0)",
        },
      }}
    >
      {children}
      <LineChart
        xAxis={[{ label: "Iteration #", data: xaxis }]}
        yAxis={[
          {
            label: dataName,
          },
        ]}
        series={[
          {
            data: graphPts,
          },
        ]}
        margin={{ left: 70 }}
        height={300}
      />
    </Paper>
  );
};
export default DataTile;
