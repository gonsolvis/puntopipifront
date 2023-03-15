import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Map() {
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);


  useEffect(() => {
    const barcelonaMap = {
      center: { lat: 41.3874, lng: 2.1686 },
      zoom: 12
    };

    const map = new window.google.maps.Map(
      document.getElementById('map'),
      barcelonaMap
    );

    // const input = document.getElementById('pac-input');
    // const options = {
    //   fields: ['formatted_address', 'geometry', 'name'],
    //   strictBounds: false,
    //   types: []
    // };

    // const autocomplete = new google.maps.places.Autocomplete(
    //   input,
    //   options
    // );

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
            position: {lat: toilet.latitude + .0012, lng: toilet.longitude}
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
        setInfoWindows(newArray.map(newMarker => newMarker.infoWindow));
      })
      .catch(err => console.log(err));

    // autocomplete.addListener('place_changed', () => {
    //   const newMarker = new window.google.maps.Marker({
    //     position: undefined,
    //     map: map,
    //     animation: window.google.maps.Animation.DROP
    //   });
    //   newMarker.setVisible(false);
    //   const place = autocomplete.getPlace();
    //   if (!place.geometry || !place.geometry.location) {
    //     window.alert(`No details available for input: '${place.name}'`);
    //     return;
    //   }
    //   if (place.geometry.viewport) {
    //     map.fitBounds(place.geometry.viewport);
    //   } else {
    //     map.setCenter(place.geometry.location);
    //     map.setZoom(17);
    //   }
    //   newMarker.setPosition(place.geometry.location);
    //   newMarker.setVisible(true);
    // });
  }, []);

  return (
    <div>
      <input id="pac-input" type="text" placeholder="Search Box" />
      <div id="map" style={{ height: '400px', width: '70%' }}></div>
    </div>
  );
}


export default Map;
