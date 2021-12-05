import React from "react";
import { StatGeoLocation } from "./stat-geolocation";

import "./dashboard.css";
import { StatPlanstatus } from "./stat-planstatus";
import { StatFarmerCount } from "./stat-famercount";

const Dashboard = () => {
  return (
    <div>
      <StatGeoLocation />
      <StatPlanstatus />
      <StatFarmerCount />
    </div>
  );
};

export default Dashboard;
