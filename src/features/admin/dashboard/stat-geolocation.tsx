import React from "react";
import Config from "../../../utils/config";
import GoogleMapReact from "google-map-react";

import { createStyles, makeStyles } from "@material-ui/core";
import { Crop, StatCropPerBarangayDto } from "../+models/dashboard-statistic";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import StatGeoPrint from "./stat-geo-print";
import { ButtonPrint } from "../../../components/button-print/button-print";

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles(() =>
  createStyles({
    infoWindowContainer: {
      backgroundColor: "#342d2dc4",
      display: "flex",
      padding: 7,
      flexWrap: "wrap",
      borderRadius: 10,
      width: 140,
      marginTop: -20,
      marginLeft: -10,

      // width: 150px;
      // border-radius: 10px;
    },
  })
);

const InfoWindow = ({ data }: { data: Crop[] }) => {
  const styles = useStyles();

  const chartData = React.useMemo(
    () => ({
      labels: data.map(
        (x) => `${x.crop} - ${x.count} (${Math.floor(x.percentage)}%)`
      ),
      legend: { display: true, position: "left" },
      datasets: [
        {
          label: "# of Crops",
          data: data.map((x) => Math.floor(x.count)),
          backgroundColor: data.map((x) => x.color),
          borderColor: ["black"],
          borderWidth: 1,
        },
      ],
    }),
    []
  );

  const total: number = React.useMemo(() => {
    return data.reduce((p, c) => {
      return (p = p + c.count);
    }, 0);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white", // "#342d2dc4",
        borderWidth: 1,
        borderColor: "#04796a",
        borderStyle: "solid",
        borderRadius: 4,
        padding: 7,
        display: "flex",
        width: 400,
        flexWrap: "wrap",
        zIndex: 25,
        left: 40,
      }}
    >
      <div style={{ flex: 1, textAlign: "center", fontSize: 15 }}>
        {`Total Count of Planted Crops : ${total}`}
      </div>
      <Pie data={chartData} />;
    </div>
  );
};

const Dot = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: color,
        borderColor: "#757575",
        borderWidth: 1,
        borderStyle: "solid",
      }}
    ></div>
  );
};

const Marker = ({
  crops,
  barangay,
}: {
  lat: number;
  lng: number;
  barangay: string;
  crops: Crop[];
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const dots = React.useMemo(() => {
    const cropDots = crops.reduce((dts, e) => {
      for (let ind = 0; ind < e.count ; ind++) {
        dts.push(e.color);
      }
      return dts;
    }, []);
    return cropDots;
  }, []);

  return (
    <div
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",

        width: 120,
        // backgroundColor: "red",
      }}
    >
      {/* <img
        style={{ width: 25, height: 25 }}
        src={`/assets/images/marker.png`}
      /> */}

      <div
        style={{
          width: 100,
          columnGap: 1,
          rowGap: 1,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {dots.map((e) => (
          <Dot color={e} />
        ))}
      </div>

      <span
        style={{ color: "#04796a", textAlign: "center", fontWeight: "bold", marginTop:5 }}
      >
        {barangay}
      </span>

      {isHovered && <InfoWindow data={crops} />}
    </div>
  );
};

type StatGeoLocationProps = {
  statData: StatCropPerBarangayDto[];
};

export const StatGeoLocation = ({ statData }: StatGeoLocationProps) => {
  const [openGeoPrint, setOpenGeoPrint] = React.useState(false);

  return (
    <>
      <div style={{ height: 800, minHeight: 300 }}>
        <StatGeoPrint
          isOpen={openGeoPrint}
          onClose={() => setOpenGeoPrint(false)}
          statData={statData}
        />

        <ButtonPrint onClick={() => setOpenGeoPrint(true)} />

        <GoogleMapReact
          // onClick={onSelectLocation}
          bootstrapURLKeys={{
            key: Config.googleMapKey,
          }}
          defaultCenter={Config.tanauanCoordinates}
          defaultZoom={12.5}
        >
          {statData.map((x, i) => (
            <Marker
              key={i}
              lat={x.lat}
              lng={x.lng}
              barangay={x.barangay}
              crops={x.crops}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};
