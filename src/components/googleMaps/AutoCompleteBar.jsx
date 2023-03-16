import React, { useEffect, useRef } from 'react';

const MapBar = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    };

    const initMap = () => {
      const map = new window.google.maps.Map(mapContainer.current, {
        center: { lat: 41.3874, lng: 2.1686 },
        zoom: 12
      });

      const input = document.getElementById('pac-input');
      const options = {
        fields: ['formatted_address', 'geometry', 'name'],
        strictBounds: false,
        types: []
      };

      const autocomplete = new window.google.maps.places.Autocomplete(input, options);

      autocomplete.addListener('place_changed', () => {
        const newMarker = new window.google.maps.Marker({
          position: undefined,
          map: map,
          animation: window.google.maps.Animation.DROP
        });
        newMarker.setVisible(false);
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          window.alert(`No details available for input: '${place.name}'`);
          return;
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        newMarker.setPosition(place.geometry.location);
        newMarker.setVisible(true);
      });
    };

    loadScript();
  }, []);

  return <div id="map" style={{ height: '400px' }} ref={mapContainer}></div>

};

export default MapBar;
