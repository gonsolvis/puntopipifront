/*  eslint-disable*/
import "./HomePage.css";
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import toiletsService from "../../services/toilets.service"
import { Link } from "react-router-dom";
import AddToilet from "../../components/AddToilet/AddToilet";
import { AuthContext } from "../../context/auth.context";
// import { GoogleMap, useLoadScript, useJsApiLoader, Marker } from '@react-google-maps/api';
import Map from "../../components/googleMaps/Map";


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

  const createToilet = (toilet) => {
    setToilets([...toilets, toilet])
  }

  const getStars = (rating) => {
    let solidStr = <i className="fa-solid fa-star"></i>
    let emptyStr = <i className="fa-sharp fa-regular fa-star"></i>
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

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setIsLoaded(false);
    };
    script.onload = () => {
      setIsLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>

      <div>
        <h1> All Toilets </h1>
        {isLoaded && <Map />}
      </div>

      {isLoggedIn ? (
  <div>
    <h1> Add Toilets </h1>
    <AddToilet createToilet={createToilet}/>
  </div>
) : (
  <Link to={`/login`} className="btn btn-primary">
    Log in to add a toilet
  </Link>
)}

<div className="w-100 ">
</div>

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