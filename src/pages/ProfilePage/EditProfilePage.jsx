import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service";



function EditProfilePage() {
    const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

//   const [imageUrl, setImageUrl] = useState("");  
//   // ******** this method handles the file upload ********
//   const handleFileUpload = (e) => {
//     // console.log("The file to be uploaded is: ", e.target.files[0]);
 
//     const uploadData = new FormData();
 
//     // imageUrl => this name has to be the same as in the model since we pass
//     // req.body to .create() method when creating a new movie in '/api/movies' POST route
//     uploadData.append("imageUrl", e.target.files[0]);
//        console.log(imageUrl)
//      toiletsService
//       .uploadImage(uploadData)
//       .then(response => {
//         // console.log("response is: ", response);
//         // response carries "fileUrl" which we can use to update the state
//         setImageUrl(response.fileUrl);
//       })
//       .catch(err => console.log("Error while uploading the file: ", err));
//   };


  //   // edit toilet
  const editHandler = (e) => {
    e.preventDefault();
    userService.updateOneProfile(user._id, {name, email})
      .then(response => {
        setEmail("");
        setName("");
                
      })
  }
  




  return (<div>
    <form onSubmit={editHandler} className="w-50 mx-auto mb-5">
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Name</label>
            <input type="text" className="form-control" id="title" aria-describedby="title" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Email</label>
            <input type="text" className="form-control" id="description" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
       {/* <div className="mb-3">
            <label htmlFor="description" className="form-label">Upload an Image:</label>
            <input type="file" onChange={(e) => handleFileUpload(e)} name="imageUrl"/>
        </div> */}
        <button type="submit" className="btn btn-primary"> Submit</button>
    </form>


    </div>

)}

export default EditProfilePage;