import "./HomePage.css";
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import toiletsService from "../../services/toilets.service"
import { Link } from "react-router-dom";
import AddToilet from "../../components/AddToilet/AddToilet";
import { AuthContext } from "../../context/auth.context";
import { GoogleMap, useLoadScript, useJsApiLoader, Marker } from '@react-google-maps/api';
import Map from "../../components/googleMaps/map";

function HomePage() {
  const [toilets, setToilets] = useState([])
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    toiletsService.getAll()
      .then((data) => {
      })
      .catch((err) => {

        console.log("error", err)
      })

  }, [])

  const getStars = (rating) => {
    let solidStr = <i className="fa-solid fa-star"></i>
    let emptyStr = <i className="fa-sharp fa-regular fa-star"></i>


    // let solidStr = <i className="fa-solid fa-toilet-paper"></i>
    // let emptyStr = <i className="fa-sharp fa-regular fa-star"></i>
    let stars = Math.round(rating)

    if (stars === 0) {
      return <>{emptyStr}{emptyStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 1) {
      return <>{solidStr}{emptyStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 2) {
      return <>{solidStr}{solidStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 3) {
      return <>{solidStr}{solidStr}{solidStr}{emptyStr}{emptyStr}</>
    } else if (stars === 4) {
      return <>{solidStr}{solidStr}{solidStr}{solidStr}{emptyStr}</>
    } else {
      return <>{solidStr}{solidStr}{solidStr}{solidStr}{solidStr}</>
    }
  }

  

  return (
    <>
       <h1> All Toilets </h1>
<Map/>
      
{/* 
    //   {isLoggedIn ? ( */}
          {/* // <input className="form-control me-2" id="pac-input" type="text" placeholder="Search..." />

          // // <div id="map"></div>

          // // <script async */}
          {/* // //   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkI1bljJ2mPXRx1mxgGs1Ow1Bqn_YOB1I&callback=initMap"> */}
          {/* // // </script> */}
          {/* // // <script src="../../components/googleMaps/app.js"></script>
          // // <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkI1bljJ2mPXRx1mxgGs1Ow1Bqn_YOB1I&callback=initMap"></script>

          // <h2> Add Toilets </h2>


      // ) : (
      //   <Link to={`/login`} className="btn btn-primary">
      //     Log in to add a toilet
      //   </Link>
      // )} */}



      <div className="d-flex flex-row flex-wrap justify-content-center">
        {toilets.map(toilet => {
          return (
            <div className="card m-4 p-2" key={toilet._id}>
              <div className="card-body">
                <p className="card-text">{toilet._id}</p>
                <p className="card-text">{toilet.title}</p>
                <p className="card-text">{toilet.description}</p>
                <p className="card-text">{getStars(toilet.rating)}</p>
                <img src={toilet.imageUrl} alt="not working" className="card-text" />
                <p className="card-text">
                  {new Date(toilet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                  {new Date(toilet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
                <Link to={`/toilets/${toilet._id}`} className="btn btn-primary">View details</Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default HomePage;
