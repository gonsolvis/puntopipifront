/*  eslint-disable*/
import { useState, useContext } from "react";
import commentService from "../../services/comment.service";
import "./Comments.css";
import avatarIcon from "./user_icon_149340 (3).png"
import { useNavigate } from "react-router-dom";
import AddComment from "../comments/AddComment"
import { AuthContext } from "../../context/auth.context";


function CommentTable({ toiletComments }) {

  const { user } = useContext(AuthContext);
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

  console.log("user", user)
  return (
    <div className="d-flex flex-column align-items-center" >
      <AddComment createComment={createComment} />

      {comments.map(comment => (
        <div className="card p-3 w-75 m-2" key={comment._id}>
          <div className="user d-flex flex-row align-items-center">
            <img src={avatarIcon} width="30" className="user-img rounded-circle mr-2" />
            <span className="user d-flex flex-row align-items-center">
              <small className="font-weight-bold text-primary m-3">
                {user.name}
              </small>
              <div className="user d-flex flex-column justify-content-center align-items-center">
                <small className="font-weight-bold">
                  {comment.content}
                </small>
              </div>
            </span>
          </div>

          <div className="user-img-container">
            <img src={comment.imageUrl} alt="Comment Image" className="user-img w-25 mr-2" />
          </div>

          <div className="action d-flex justify-content-between mt-2 align-items-center">
            <div className="reply px-4">
              {user?.isAdmin && (
                <button className="btn btn-danger mx-2" onClick={() => deleteHandler(comment._id)}>Delete</button>
              )}
            </div>
            <div className="icons align-items-center">
              <i className="fa fa-star text-warning"></i>
              <i className="fa fa-check-circle-o check-icon"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentTable;
