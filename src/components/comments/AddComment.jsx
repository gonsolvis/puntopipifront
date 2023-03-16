// import CommentRow from "./CommentRow"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import commentService from "../../services/comment.service";
import "./Comments.css";
import { Link, useNavigate } from "react-router-dom";
import uploadService from "../../services/upload.service";

function AddComment({ createComment, idToilet }) {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useContext(AuthContext);

  // ADDING A COMMENT BOX
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [toilet, setToilet] = useState(idToilet)



  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

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
    commentService.createOneComment({ content, imageUrl, creator: user._id, toilet })
      .then(response => {
        createComment(response.data)
        setContent("");
        setImageUrl("");


      })
      .catch(err => console.log("hello", err))
        }



  return (
    <div className="d-flex flex-column align-items-center   " >

      {isLoggedIn ? (
        <div>
          <h1> Add Comment </h1>
          <form onSubmit={submitHandler} className=" mx-auto mb-5 ">
            <div className="mb-3 d-flex flex-column align-items-center ">
              <label htmlFor="title" className="form-label ">Description</label>
              <input type="text" className="form-control w-75"  placeholder="Write a comment" id="title" aria-describedby="title" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>

            <div className="mb-3 d-flex flex-column align-items-center ">
            <label htmlFor="picture" className="form-label">Upload an Image:</label>
                <input id="picture" type="file" onChange={(e) => handleFileUpload(e)} name="imageUrl" />
            </div>

            <button type="submit" className="btn btn-primary">Create Comment</button>
          </form>
        </div>
      ) : (
        <Link to={`/login`} className="btn btn-primary"> Log in to add a comment  </Link>
      )}
    </div>
  );
}


export default AddComment