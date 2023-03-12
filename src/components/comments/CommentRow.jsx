// import CommentRow from "./CommentRow"
import { useEffect, useState } from "react";
import commentService from "../../services/comment.service";
import "./Comments.css";




function CommentTable() {
   
// ADDING A COMMENT BOX
   const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        commentService.createOneComment({content, imageUrl})
        .then(response => {
            setContent("");
            setImageUrl("");
         
        })
        .catch(err => console.log(err))
    }


return (
    <div className="d-flex flex-column align-items-center " >
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

           
        </div>
    );
}


export default CommentTable