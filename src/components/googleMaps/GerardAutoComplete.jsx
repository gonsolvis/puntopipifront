/*  eslint-disable*/
import { Autocomplete } from '@react-google-maps/api';
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export function LocationSearchInput({getAdressHandler, address, setAddress}) {
  const handleChange = (address) => {
    setAddress(address);
  };



  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        window.createMarker(latLng);
        getAdressHandler(latLng, address);
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            value={address}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'form-control',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#FAFAFA', cursor: 'pointer' }
                : { backgroundColor: '#FFFFFF', cursor: 'pointer' };
              return (
                <div key={suggestion.index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

/*
const getAdressHandler = (latLng, address) =>{
  setCoordinates(latLng);
    setAddress(address);
}
<Autocomplete getAdressHandler={getAdressHandler}
*/

export default LocationSearchInput;