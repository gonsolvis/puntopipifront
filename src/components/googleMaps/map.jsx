import React, { useEffect, useState } from 'react';
import axios from 'axios';




function Map({ canAddMarker }) {
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  window.createMarker = (latLng) => {
    const lat = latLng.lat;
    const lng = latLng.lng;

    const newMarker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      draggable: true
    });
    setMarker(newMarker);
    setLatitude(lat);
    setLongitude(lng);

    window.latitude = lat;
    window.longitude = lng;
  }

  useEffect(() => {
    const barcelonaMap = {
      center: { lat: 41.3874, lng: 2.1686 },
      zoom: 12
    };

    const map = new window.google.maps.Map(
      document.getElementById('map'),
      barcelonaMap
    );

    setMap(map);


    const input = document.getElementById('pac-input');
    const options = {
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: []
    };


    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/toilets`)
      .then(response => {
        const newMarkers = response.data.map(toilet => {
          if(!toilet.latitude || !toilet.longitude){
            return;
          }
            const latLng = {
            lat: toilet.latitude,
            lng: toilet.longitude
          };
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<p style="font-weight: bolder; font-size: 1.5rem">${toilet.title}</p>
              <p style="font-style: italic; font-size: 1.2rem">${toilet.title}</p>
              <p>${toilet.address}</p>
              <img style="width:350px; height:150px" src="${toilet.imageUrl}" alt="img-${toilet.title}">`,
            position: {lat: toilet.latitude + .0050, lng: toilet.longitude}
          });
          const marker = new window.google.maps.Marker({
            position: latLng,
            map: map
          });
          marker.addListener('click', () => {
            infoWindow.open(map);
          });
          return { marker, infoWindow };
        });
        let newArray = newMarkers.filter( marker => marker !== undefined) 
        setMarkers(newArray);
        console.log(newArray);
        setInfoWindows(newArray.map(newMarker => newMarker.infoWindow) );
      })
      .catch(err => console.log(err));

      map.addListener('click', event => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        if (!canAddMarker) {
          return;
        }

        if (marker) {
          marker.setMap(null);
        }

        const newMarker = new window.google.maps.Marker({
          position: event.latLng,
          map: map,
          draggable: true
        });
        setMarker(newMarker);
        setLatitude(lat);
        setLongitude(lng);

        window.setAddress(lat, lng);

        window.latitude = lat;
        window.longitude = lng;
      });



    
  }, []);

  return (
    <div>
      <input id="pac-input" type="text" placeholder="Search Box" />
      <div id="map" style={{ height: '400px', width: '70%' }}></div>
    </div>
  );
}

export default Map;