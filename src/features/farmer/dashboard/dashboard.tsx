import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../+state/farmerActions";
import { selectDashboard } from "../+state/farmerSelectors";
import { makeStyles, createStyles } from "@material-ui/core";
import { RowStatCard } from "./row-stat-card";
import PlantedLogo from "../../../assets/planted.png";
import HarvestedLogo from "../../../assets/harvested.png";
import DamagedLogo from "../../../assets/damaged.png";

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    rowContainer: { display: "flex", flexDirection: "row", columnGap: 20 },
  })
);

const Dashboard = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const dashboardData = useSelector(selectDashboard);

  React.useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  return (
    <div>
      {dashboardData && (
        <RowStatCard
          title="Top Planted Crops"
          bgColor="green"
          logo={PlantedLogo}
          stat={dashboardData.planted}
        />
      )}

      {dashboardData && (
        <RowStatCard
          title="Top Harvested Crops"
          bgColor="orange"
          logo={HarvestedLogo}
          stat={dashboardData.harvested}
        />
      )}

      {dashboardData && (
        <RowStatCard
          title="Top Damaged Crops"
          bgColor="red"
          logo={DamagedLogo}
          stat={dashboardData.damaged}
        />
      )}
    </div>
  );
};

export default Dashboard;
