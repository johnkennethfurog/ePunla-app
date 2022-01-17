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
import {
  FarmerPerBarangayDto,
  StatFarmerPerBarangayDto,
} from "../+models/dashboard-statistic";
import { ButtonPrint } from "../../../components/button-print/button-print";
import StatFarmerCountPrint from "./stat-farmercount-print";

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
  farmerPrBarangay: FarmerPerBarangayDto[];
};
export const StatFarmerCount = ({
  statData,
  farmerPrBarangay,
}: StatFarmerCountProps) => {
  const [openGeoPrint, setOpenGeoPrint] = React.useState(false);
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
    <div style={{ marginTop: 50, width: "100%", position: "relative" }}>
      <StatFarmerCountPrint
        isOpen={openGeoPrint}
        onClose={() => setOpenGeoPrint(false)}
        statData={farmerPrBarangay}
      />
      <ButtonPrint
        style={{ position: "absolute", left: 15, top: 10 }}
        onClick={() => setOpenGeoPrint(true)}
      />
      <Bar options={options} data={chartData} />;
    </div>
  );
};
