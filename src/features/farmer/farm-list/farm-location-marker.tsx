import React from "react";

type LocationMarkerProps = {
  lng: number;
  lat: number;
};
const LocationMarker = (props: LocationMarkerProps) => {
  console.log("props", props);

  return (
    <div style={{ height: 25, width: 25, backgroundColor: "blue" }}>a</div>
  );
};

export default LocationMarker;
