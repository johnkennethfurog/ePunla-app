import React from "react";
import Config from "../../../utils/config";
import GoogleMapReact, { ClickEventValue } from "google-map-react";

import logo from "../../../assets/1.svg"; // with import
import { createStyles, makeStyles } from "@material-ui/core";
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
      marginLeft: 10,

      // width: 150px;
      // border-radius: 10px;
    },
    pointer: {
      width: 50,
      height: 50,
    },
  })
);

const sample_data = [
  {
    coordinates: [14.047582745254594, 121.1525217615349],
    data: [2, 4, 6],
  },
  {
    coordinates: [14.084998, 121.112438],
    data: [1, 2, 3, 4, 5],
  },
  {
    coordinates: [14.137884, 121.100209],
    data: [3, 5, 2],
  },
  {
    coordinates: [14.029925, 121.090175],
    data: [3, 2, 1, 6, 5, 4],
  },
  {
    coordinates: [14.029925, 121.090175],
    data: [3, 2, 1, 6, 5, 4],
  },
  {
    coordinates: [14.108547, 121.072809],
    data: [6, 4, 2, 3, 1, 5],
  },
];

const InfoWindow = (props: { lat: number; lng: number; fruits: number[] }) => {
  const styles = useStyles();

  return (
    <div className={"bubble"}>
      <div className={"triangleLeft"}></div>
      {props.fruits.map((fruit) => {
        return (
          <img
            style={{ width: 30, height: 30 }}
            key={fruit}
            src={`/assets/images/${fruit}.svg`}
            alt={fruit.toString()}
          />
        );
      })}
    </div>
  );
};

export const StatGeoLocation = () => {
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
        {sample_data.map((x, i) => (
          <InfoWindow
            key={i}
            lat={x.coordinates[0]}
            lng={x.coordinates[1]}
            fruits={x.data}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};
