// // import "./LoginPage.css";
import { useState, useContext } from "react";
import toiletsService from "../../services/toilets.service";
import uploadService from "../../services/upload.service"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function AddToilet({ createToilet }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    

    // ******** this method handles the file upload ********
    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
        console.log("IMAGE URL", imageUrl)

        uploadService
            .uploadImage(uploadData)
            .then(response => {
                // console.log("response is: ", response);
                // response carries "fileUrl" which we can use to update the state
                setImageUrl(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };



    const submitHandler = (e) => {
        e.preventDefault();
        if(imageUrl === "") {
            return;
        }
        toiletsService.createOne({ title, description, rating, imageUrl, creator: user._id })
            .then(response => {
                createToilet(response.data)
                setTitle("");
                setDescription("");
                setRating("");
                setImageUrl("");
                console.log("ENTRA")
            }).catch(err => console.log(err))
    }

    return (<div>
        <form onSubmit={submitHandler} className="w-50 mx-auto mb-5">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">rating</label>
                <input type="text" className="form-control" id="rating" placeholder="1-5" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="picture" className="form-label ">Upload an Image:</label>
                <input id="picture" type="file" className="form-label" onChange={(e) => handleFileUpload(e)} name="imageUrl" />
            </div>
            <button type="submit" className="btn btn-primary">Create project</button>
        </form>


    </div>

    )
}

export default AddToilet;
