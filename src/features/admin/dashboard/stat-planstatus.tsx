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
import { StatCropStatusPerBarangayDto } from "../+models/dashboard-statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const sample_data = [
//   {
//     barangay: "Barangay A",
//     planted: 25,
//     damaged: 51,
//     harvested: 100,
//   },
//   {
//     barangay: "Barangay B",
//     planted: 16,
//     damaged: 25,
//     harvested: 61,
//   },
//   {
//     barangay: "Barangay C",
//     planted: 25,
//     damaged: 51,
//     harvested: 12,
//   },
//   {
//     barangay: "Barangay D",
//     planted: 76,
//     damaged: 65,
//     harvested: 89,
//   },
//   {
//     barangay: "Barangay E",
//     planted: 72,
//     damaged: 35,
//     harvested: 36,
//   },
//   {
//     barangay: "Barangay F",
//     planted: 25,
//     damaged: 75,
//     harvested: 47,
//   },
// ];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "PLANTED, DAMAGED AND HARVESTED CROP BASED ON AREA",
    },
  },
};

// const labels = sample_data.map((x) => x.barangay);
// const planted = sample_data.map((x) => x.planted);
// const damaged = sample_data.map((x) => x.damaged);
// const harvested = sample_data.map((x) => x.harvested);

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Planted",
//       data: planted,
//       backgroundColor: "#4472C4",
//     },
//     {
//       label: "Damaged",
//       data: damaged,
//       backgroundColor: "#ED7D31",
//     },
//     {
//       label: "Harvested",
//       data: harvested,
//       backgroundColor: "#A5A5A5",
//     },
//   ],
// };

type StatPlanstatusProps = {
  statData: StatCropStatusPerBarangayDto[];
};
export const StatPlanstatus = ({ statData }: StatPlanstatusProps) => {
  const chartData = React.useMemo(() => {
    const labels = statData.map((x) => x.barangay);
    const planted = statData.map((x) => x.planted);
    const damaged = statData.map((x) => x.damaged);
    const harvested = statData.map((x) => x.harvested);

    const data = {
      labels,
      datasets: [
        {
          label: "Planted",
          data: planted,
          backgroundColor: "#4472C4",
        },
        {
          label: "Damaged",
          data: damaged,
          backgroundColor: "#ED7D31",
        },
        {
          label: "Harvested",
          data: harvested,
          backgroundColor: "#A5A5A5",
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
