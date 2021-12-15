import React from "react";
import Config from "../../../utils/config";
import GoogleMapReact, { ClickEventValue } from "google-map-react";

import logo from "../../../assets/1.svg"; // with import
import { createStyles, makeStyles } from "@material-ui/core";
import { Crop, StatCropPerBarangayDto } from "../+models/dashboard-statistic";
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

const InfoWindow = (props: { lat: number; lng: number; data: Crop[] }) => {
  const styles = useStyles();

  return (
    <div className={"bubble"}>
      <div className={"triangleLeft"}></div>
      {props.data.map((d) => {
        return (
          <div
            key={d.crop}
            style={{
              color: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: 120,
              marginBottom: 3,
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
      })}
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
          <InfoWindow key={i} lat={x.lat} lng={x.lng} data={x.crops} />
        ))}
      </GoogleMapReact>
    </div>
  );
};
