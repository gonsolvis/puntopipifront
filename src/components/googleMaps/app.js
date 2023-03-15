// let markers = []
// let infowindows = []

// function initMap() {
//     let barcelonaMap = {
//         center: { lat: 41.3874, lng: 2.1686 },
//         zoom: 12
//     }
//     map = new google.maps.Map(document.getElementById("map"), barcelonaMap)

//     const input = document.getElementById("pac-input");
//     const options = {
//         fields: ["formatted_address", "geometry", "name"],
//         strictBounds: false,
//         types: [],
//     };

//     const autocomplete = new google.maps.places.Autocomplete(input, options);


//         axios.get(`${REACT_APP_SERVER_URL}`)
//             .then(response => {
//                 response.data.forEach(toilet => {
//                     let latLng = {
//                         lat: toilet.latitude,
//                         lng: toilet.longitude
//                     }
//                     console.log("POST!!!!!!!!", toilet)
//                     infowindows.push(new google.maps.InfoWindow({
//                         content: `<p style="font-weight: bolder; font-size: 1.5rem"> ${toilet.title} </p>
//                     <p style="font-style: italic; font-size: 1.2rem"> ${toilet.title} </p>
//                     <p> ${toilet.address} </p>
//                     <img style="width:350px; height:150px" src="${toilet.imageUrl}" alt="img-${toilet.title}">`,
//                         position: latLng
//                     }));
//                     markers.push(new google.maps.Marker({
//                         position: latLng,
//                         map: map,
//                     }))

//                 })
//                 markers.forEach((marker, k) => {
//                     marker.addListener("click", () => {
//                         infowindows[k].open(map, marker);
//                     });
//                 })

//             })
//             .catch(err => console.log(err))


//     autocomplete.addListener("place_changed", () => {  // add a listener for when the search box changes

//         let newMarker = new google.maps.Marker({  // creates a new marker for the searched place
//             position: undefined,
//             map: map,
//             animation: google.maps.Animation.DROP,
//         })

//         newMarker.setVisible(false);

//         const place = autocomplete.getPlace();
//         console.log(place)

//         if (!place.geometry || !place.geometry.location) {
//             // User entered the name of a Place that was not suggested and
//             // pressed the Enter key, or the Place Details request failed.
//             window.alert("No details available for input: '" + place.name + "'");
//             return;
//         }

//         // If the place has a geometry, then present it on a map.
//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17);
//         }

//         newMarker.setPosition(place.geometry.location);
//         newMarker.setVisible(true);
//     });


// };

// window.initMap = initMap;

// //    let iconImage = {
// //     url: "toiletIcon.png",
// //     scaledSize: new google.maps.Size(25,25)
// // }

// //    function addMarker(location, title ){

// //     let marker = new google.maps.Marker({
// //         position:location,
// //         map:map,
// //         icon: iconImage
// //     });
// //     const detailWindow = new google.maps.InfoWindow({
// //         content: title,
// //     });
// //     marker.addListener("click", ()=>{
// //         detailWindow.open(map,marker);
// //     })
// //    }

// //    addMarker({lat: 41.370488467060554, lng: 2.168008090662969}, "barcelona");
// //    addMarker({lat: 41.38284630278443, lng: 2.140467170103843}, "test")




