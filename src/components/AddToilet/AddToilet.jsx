import axios from "axios";
import React, { useState } from 'react';


function AddToilet() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [image, setImage] = useState("");


    const [isOpen, setIsOpen] = useState(false);

    const dropdownClickHandler = () => {
        setIsOpen(!isOpen);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_URL+"/toilets/edit/"+toiletId, {title, description, rating, image})
        .then(response => {
            //////
        })
        .catch(err=>console.log(err))
    }

    };

    return (
        <div className="dropdown-form">
            <button className="dropdown-btn" onClick={dropdownClickHandler}>
                Add Toilet
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <form onSubmit={submitHandler}>
                        <label htmlFor="name">Title:</label>
                        <input type="text" id="title" name="title" />
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" />
                        <label htmlFor="rating">Rating:</label>
                        <input type="text" id="rating" name="rating" />
                        <label htmlFor="image">Image:</label>
                        <input type="iamge" id="image" name="image" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );

// export default AddToilet;
