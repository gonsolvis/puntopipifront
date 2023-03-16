// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import "./mapIndex.css"

// export default function Home() {
//   const { isLoaded } = useLoadScript({
//     // googleMapsApiKey: "AIzaSyAIoSkdJG2_FfLwGiKljfKM6sM0NVzviUo"
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 41.390205, lng: 2.154007 }), []);

//   return (
//     <>
//     <GoogleMap zoom={13} center={center} mapContainerClassName="map-container">
//     <div id="mapbox">
//       <Marker position={center} />
//       </div>
//     </GoogleMap>
//     </>
//   );
// }