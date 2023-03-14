import { useEffect, useState } from "react";
import commentService from "../../services/comment.service";
import "./Comments.css";
import avatarIcon from "./user_icon_149340 (3).png"
import { Link, useNavigate } from "react-router-dom";
import AddComment from "../comments/AddComment"



function CommentTable({ toiletComments }) {
  const [comments, setComments] = useState(toiletComments)

  const navigate = useNavigate();

  const createComment = (comment) => {
    setComments([...comments, comment])
  }


  // DELETE COMMENT
  const deleteHandler = (commentId) => {
    commentService.deleteComment(commentId)
      .then(response => {
        console.log(response);
        navigate("/", { replace: true });
      })
  }


  return (
    <div className="d-flex flex-column align-items-center " >
      <h2> Comments </h2>

      <AddComment createComment={createComment} />

      {comments.length === 0 ?
        <p>There are still no comments, be the first to add one!
          <i className="fa-regular fa-face-sad-cry fa-2x m-3"></i></p>
        :
        comments.map(comment => {
          return (

            <div className="card p-3 w-75 m-2" key={comment._id}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="user d-flex flex-row align-items-center">
                  <img src={avatarIcon} width="30" className="user-img rounded-circle mr-2" />
                  <span>
                    <small className="font-weight-bold text-primary m-3">
                      {comment.creator.name}
                    </small>
                    <small className="font-weight-bold">
                      {comment.content}
                    </small>
                  </span>

                  <div>
                    <br />

                    <img src={comment.imageUrl} alt="Comment Image" className="user-img rounded-circle w-25 mr-2" />

                  </div>

                </div>
                <small>
                  {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                  {new Date(comment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </small>
              </div>
              <div className="action d-flex justify-content-between mt-2 align-items-center">
                <div className="reply px-4">
                  {!comment.creator.isAdmin && (
                    <>
                      <button className="btn btn-danger mx-2" onClick={() => deleteHandler(comment._id)}>Delete</button>
                    </>
                  )}
                </div>
                <div className="icons align-items-center">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-check-circle-o check-icon"></i>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}


export default CommentTable