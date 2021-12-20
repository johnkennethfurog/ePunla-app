import React from "react";
import Config from "../../../utils/config";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import randomColor from "randomcolor";

import logo from "../../../assets/1.svg"; // with import
import { createStyles, makeStyles } from "@material-ui/core";
import { Crop, StatCropPerBarangayDto } from "../+models/dashboard-statistic";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
      labels: data.map((x) => `${x.crop} - ${x.percentage}%`),
      legend: { display: true, position: "left" },
      datasets: [
        {
          label: "# of Votes",
          data: data.map((x) => x.count),
          backgroundColor: data.map((x) => randomColor()),
          borderColor: ["black"],
          borderWidth: 1,
        },
      ],
    }),
    []
  );

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
      <Pie data={chartData} />;
      {/* <div className={"triangleLeft"}></div>
      {data.map((d) => {
        return (
          <div
            key={d.crop}
            style={{
              // color: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: 120,
              marginBottom: 3,
              fontSize: 12,
            }}
          >
            <img
              style={{ width: 12, height: 12, marginRight: 2 }}
              src={`/assets/images/1.svg`}
              alt={d.toString()}
            />
            <span>{`${d.crop} - ${d.count} (${d.percentage}%)`}</span>
          </div>
        );
      })} */}
    </div>
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
        width: 50,
        height: 50,
        // backgroundColor: "red",
      }}
    >
      <img
        style={{ width: 25, height: 25 }}
        src={`/assets/images/marker.png`}
      />
      <span
        style={{ color: "#04796a", textAlign: "center", fontWeight: "bold" }}
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
  return (
    <div style={{ height: 800, minHeight: 300 }}>
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
  );
};
