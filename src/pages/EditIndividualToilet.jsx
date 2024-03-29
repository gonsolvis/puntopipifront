/*  eslint-disable*/
import { useState, useContext } from "react";
import toiletsService from "../services/toilets.service";
import { AuthContext } from "../context/auth.context";
import uploadService from "../services/upload.service";



function EditIndividualToilet({ editToilet, idToilet }) {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [clean, setClean] = useState(0);



  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    console.log(imageUrl)
    uploadService
      .uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  //   // edit toilet
  const editHandler = (e) => {
    e.preventDefault();
    if (imageUrl === "") {
      return;
    }

    toiletsService.updateOne(idToilet, { title, description, rating, clean, imageUrl, creator: user._id })
      .then(response => {
        editToilet(response.data)
        setTitle("");
        setDescription("");
        setRating("");
        setClean("");
        setImageUrl("");

      })
  }


  return (<div>
    <form onSubmit={editHandler} className="w-50 mx-auto mb-5">
    <div className="mb-3">
        <label htmlFor="description" className="form-label">Upload an Image:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} name="imageUrl" />
      </div>
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
        <input type="text" className="form-control" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Cleanliness</label>
        <input type="text" className="form-control" id="clean" value={clean} onChange={(e) => setClean(e.target.value)} />
      </div>
     
      <button type="submit" className="btn btn-primary">Submit </button>
    </form>


  </div>

  )
}

export default EditIndividualToilet;