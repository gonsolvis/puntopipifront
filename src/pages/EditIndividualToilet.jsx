import { useEffect, useState, useContext } from "react";
import toiletsService from "../services/toilets.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import uploadService from "../services/upload.service";



function EditIndividualToilet({editToilet, idToilet}) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState(0);


  
  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
       console.log(imageUrl)
       uploadService
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  //   // edit toilet
  const editHandler = (e) => {
    e.preventDefault();
    if(imageUrl === "") {
      return;
    }
    
      toiletsService.updateOne(idToilet, {title, description, rating, imageUrl, creator: user._id})
      .then(response => {
        editToilet(response.data)
          setTitle("");
          setDescription("");
          setRating("");
          setImageUrl("");
          
      })
  }
  

console.log("TOILETID!!!!", idToilet)


  return (<div>
    <form onSubmit={editHandler} className="w-50 mx-auto mb-5">
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
            <label htmlFor="description" className="form-label">Upload an Image:</label>
            <input type="file" onChange={(e) => handleFileUpload(e)} name="imageUrl"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit </button>
    </form>


    </div>

)}

export default EditIndividualToilet;