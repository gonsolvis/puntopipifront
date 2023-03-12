// // import "./LoginPage.css";
import { useState } from "react";
import toiletsService from "../../services/toilets.service";

function AddToilet() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [imageUrl, setImageUrl] = useState("");


//     const [isOpen, setIsOpen] = useState(false);

//     const dropdownClickHandler = () => {
//         setIsOpen(!isOpen);
//     };

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

return (<div>
    <form onSubmit={submitHandler} className="w-50 mx-auto mb-5">
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">rating</label>
            <input type="text" className="form-control" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">imageUrl</label>
            <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Create project</button>
    </form>


    </div>

)}

export default AddToilet;
