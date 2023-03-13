// import CommentRow from "./CommentRow"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import commentService from "../../services/comment.service";
import "./Comments.css"; 
import {Link, useNavigate } from "react-router-dom";




function AddComment({toiletId}) {
    const {user, isLoggedIn } = useContext(AuthContext);
// ADDING A COMMENT BOX
   const [content, setContent] = useState("");
   const [creator, setCreator] = useState("");
   const [imageUrl, setImageUrl] = useState("");
   const [toilet, setToilet] = useState(toiletId)

    const submitHandler = (e) => {
        setCreator(user._id);
        e.preventDefault();
        commentService.createOneComment({content, imageUrl, creator, toilet})
        .then(response => { 
            console.log("promiss resuelta")
            setContent("");
            setImageUrl("");
            
        })
        .catch(err => console.log(err))
    }

console.log(user)
return (
    <div className="d-flex flex-column align-items-center " >

     {isLoggedIn ? (
      <>
      <h1> Add Comment </h1>
            <form onSubmit={submitHandler} className="w-50 mx-auto mb-5">
    <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" aria-describedby="title" value={content} onChange={(e)=>setContent(e.target.value)} />
    </div>
    <div className="mb-3">
        <label htmlFor="description" className="form-label">imageUrl</label>
        <input type="text" className="form-control" id="imageUrl" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}/>
    </div>
    <button type="submit" className="btn btn-primary">Create Comment</button>
</form>

</>
) : (  <Link to={`/login`} className="btn btn-primary"> Log in to add a comment  </Link>)}
           
        </div>
    );
}


export default AddComment