import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../lottie/farm_location.json";

type LocationMarkerProps = {
  lng: number;
  lat: number;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

const LocationMarker = (props: LocationMarkerProps) => {
  return (
    <Lottie
      style={{
        height: 100,
        width: 100,
        marginLeft: -50,
        marginTop: -50,
      }}
      {...defaultOptions}
    />
  );
};

export default LocationMarker;
