// import CommentRow from "./CommentRow"
import { useEffect, useState } from "react";
import commentService from "../../services/comment.service";
import "./Comments.css";
import avatarIcon from "./user_icon_149340 (3).png"



function CommentTable() {
    const [comments, setComment] = useState([])

    useEffect(() => {
        commentService.getAllComments()
            .then((data) => {
                setComment(data.data)

            })
            .catch((err) => {

                console.log(err)
            })

    }, [])
    console.log(comments)


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
        <h1> All Comments </h1>

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

            {comments.map(comment => {
                return (

                    <div className="card p-3 w-75 m-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center">
                                <img
                                    src={avatarIcon} width="30" className="user-img rounded-circle mr-2" /><span>
                                    <small className="font-weight-bold text-primary m-3">
                                        {/* {comment.creator.name} */}
                                    </small>{" "}
                                    <small className="font-weight-bold">
                                        {comment.content}
                                    </small>
                                </span>
                            </div>
                            <small>
                                {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                                {new Date(comment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </small>

                        </div>
                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                            <div className="reply px-4">
                                {/* {!comment.creator.isAdmin && (
                                    <>
                                        <small style={{ color: 'red' }}> Remove</small>
                                        <span className="dots mx-1"></span>
                                    </>
                                )} */}
                            </div>
                            <div className="icons align-items-center">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-check-circle-o check-icon"></i>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}


export default CommentTable