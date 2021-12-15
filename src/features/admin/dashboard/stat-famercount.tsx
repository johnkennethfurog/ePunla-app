import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { StatFarmerPerBarangayDto } from "../+models/dashboard-statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "TOTAL FARMERS PER BARANGAY",
    },
  },
};

type StatFarmerCountProps = {
  statData: StatFarmerPerBarangayDto[];
};
export const StatFarmerCount = ({ statData }: StatFarmerCountProps) => {
  const chartData = React.useMemo(() => {
    const labels = statData.map((x) => x.barangay);
    const farmersCount = statData.map((x) => x.farmerCount);

    const data = {
      labels,
      datasets: [
        {
          label: "No. of Farmers",
          data: farmersCount,
          backgroundColor: "#4472C4",
        },
      ],
    };

    return data;
  }, [statData]);

  return (
    <div style={{ marginTop: 50 }}>
      <Bar options={options} data={chartData} />;
    </div>
  );
};
