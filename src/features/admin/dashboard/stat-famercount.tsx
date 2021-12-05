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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const sample_data = [
  {
    barangay: "Barangay A",
    count: 25,
  },
  {
    barangay: "Barangay B",
    count: 16,
  },
  {
    barangay: "Barangay C",
    count: 25,
  },
  {
    barangay: "Barangay D",
    count: 76,
  },
  {
    barangay: "Barangay E",
    count: 29,
  },
  {
    barangay: "Barangay F",
    count: 33,
  },
  {
    barangay: "Barangay G",
    count: 18,
  },
  {
    barangay: "Barangay H",
    count: 46,
  },
  {
    barangay: "Barangay I",
    count: 24,
  },
  {
    barangay: "Barangay J",
    count: 61,
  },
];

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

const labels = sample_data.map((x) => x.barangay);
const farmersCount = sample_data.map((x) => x.count);

export const data = {
  labels,
  datasets: [
    {
      label: "No. of Farmers",
      data: farmersCount,
      backgroundColor: "#4472C4",
    },
  ],
};
export const StatFarmerCount = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <Bar options={options} data={data} />;
    </div>
  );
};
