
/*  eslint-disable*/
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ center, zoom }) => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = ({ lat, lng }) => {
    const newMarker = {
      lat,
      lng,
    };
    setMarkers([...markers, newMarker]);
    console.log(`New marker added at: ${lat}, ${lng}`);
  };

  const renderMarkers = () =>
    markers.map((marker, index) => (
      <Marker key={index} lat={marker.lat} lng={marker.lng} />
    ));

  const Marker = () => <div className="marker">📍</div>;

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key:"AIzaSyAIoSkdJG2_FfLwGiKljfKM6sM0NVzviUo" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={handleMapClick}
      >
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
};

export default Map;