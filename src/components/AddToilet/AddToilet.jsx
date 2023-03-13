// // import "./LoginPage.css";
import { useState } from "react";
import toiletsService from "../../services/toilets.service";

function AddToilet() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const [isOpen, setIsOpen] = useState(false);

    const dropdownClickHandler = () => {
        setIsOpen(!isOpen);
    };

const submitHandler = (e) => {
    e.preventDefault();
    toiletsService.createOne({title, description, rating, imageUrl})
    .then(response => {
         setTitle("");
        setDescription("");
        setRating("");
        setImageUrl("");
    })
    .catch(err => console.log(err))
}


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
    )

export default AddToilet;
