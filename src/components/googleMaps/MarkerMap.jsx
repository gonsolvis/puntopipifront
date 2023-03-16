// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, Marker, GoogleMaps } from 'google-maps-react';

// class MapContainer extends Component {
//   state = {
//     markers: []
//   };

//   onMapClick = (mapProps, map, clickEvent) => {
//     const lat = clickEvent.latLng.lat();
//     const lng = clickEvent.latLng.lng();
//     const newMarker = { lat, lng };
//     this.setState(prevState => ({
//       markers: [...prevState.markers, newMarker]
//     }));
//   };

//   render() {
//     const { google } = this.props;
//     const { markers } = this.state;
//     return (
//       <Map
//         google={google}
//         zoom={12}
//         onClick={this.onMapClick}
//         initialCenter={{ lat: 41.3874, lng: 2.1686 }}
//       >
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker} />
//         ))}
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
// })(MapContainer);
