import React from "react";
import { StatGeoLocation } from "./stat-geolocation";

import "./dashboard.css";
import { StatPlanstatus } from "./stat-planstatus";
import { StatFarmerCount } from "./stat-famercount";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../+state/adminActions";
import { selectDashboardData } from "../+state/adminSelectors";
import { makeStyles, createStyles } from "@material-ui/core";
import { StatCard } from "./stat-card";

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    rowContainer: { display: "flex", flexDirection: "row", columnGap: 20 },
  })
);

const Dashboard = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const dashboardData = useSelector(selectDashboardData);

  React.useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: 20,
          flexDirection: "row",
          columnGap: 10,
        }}
      >
        <StatCard
          value={`${dashboardData?.statCountDto?.activeFarmerCount ?? 0}`}
          label="Tota Farmer Count"
        />
        <StatCard
          value={`${dashboardData?.statCountDto?.farmCount ?? 0}`}
          label="Tota Farm Count"
        />
        <StatCard
          value={`${
            dashboardData?.statCountDto?.plantedCropsSqm?.toLocaleString() ?? 0
          } sqm.`}
          label="Total Area of Planted Crops"
        />
        <StatCard
          value={`${
            dashboardData?.statCountDto?.harvestedCropsSqm?.toLocaleString() ??
            0
          } sqm.`}
          label="Tota Area of Harvested Crops"
        />
        <StatCard
          value={`${
            dashboardData?.statCountDto?.damagedCropsSqm?.toLocaleString() ?? 0
          } sqm.`}
          label="Tota Area of Damaged Crops"
        />
      </div>

      <StatGeoLocation statData={dashboardData?.statCropPerBarangayDto ?? []} />
      <div className={styles.rowContainer}>
        <StatPlanstatus
          statData={dashboardData?.statCropStatusPerBarangayDto ?? []}
        />
        <StatFarmerCount
          statData={dashboardData?.statFarmerPerBarangayDto ?? []}
        />
      </div>
    </div>
  );
};

export default Dashboard;
