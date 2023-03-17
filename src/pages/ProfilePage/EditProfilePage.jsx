/*  eslint-disable*/
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service";
import uploadService from "../../services/upload.service";


function EditProfilePage({ editProfile }) {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");


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


  //   // edit profile
  const editHandler = (e) => {
    e.preventDefault();
    userService.updateOneProfile(user._id, { name, email, imageUrl })
      .then(response => {
        editProfile(response.data)
        setEmail("");
        setName("");
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
        <label htmlFor="title" className="form-label">Name</label>
        <input type="text" className="form-control" id="title" aria-describedby="title" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Email</label>
        <input type="text" className="form-control" id="description" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
     
      <button className="btn btn-primary"> Submit</button>
    </form>


  </div>

  )
}

export default EditProfilePage;