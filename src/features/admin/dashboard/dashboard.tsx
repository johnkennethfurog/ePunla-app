import React from "react";
import { StatGeoLocation } from "./stat-geolocation";

import "./dashboard.css";
import { StatPlanstatus } from "./stat-planstatus";
import { StatFarmerCount } from "./stat-famercount";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../+state/adminActions";
import { selectDashboardData } from "../+state/adminSelectors";

const Dashboard = () => {
  const dispatch = useDispatch();

  const dashboardData = useSelector(selectDashboardData);

  React.useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  return (
    <div>
      <StatGeoLocation statData={dashboardData?.statCropPerBarangayDto ?? []} />
      <StatPlanstatus
        statData={dashboardData?.statCropStatusPerBarangayDto ?? []}
      />
      <StatFarmerCount
        statData={dashboardData?.statFarmerPerBarangayDto ?? []}
      />
    </div>
  );
};

export default Dashboard;
