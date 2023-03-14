import { useEffect, useState, useContext } from "react";
import toiletsService from "../services/toilets.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CommentTable from "../components/comments/CommentTable";
import AddComment from "../components/comments/AddComment"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditIndividualToilet from "../pages/EditIndividualToilet"



function IndividualToilet() {
  let { idToilet } = useParams();
  console.log("PARAMS details", idToilet)

  const { user } = useContext(AuthContext);


  const [toilet, setToilet] = useState({ comments: "patata" })
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    toiletsService.getOne(idToilet)
      .then((data) => {
        setToilet(data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })

  }, []);


  //   // DELETE COMMENT
  const deleteHandler = (idToilet) => {
    toiletsService.deleteToilet(idToilet)
      .then(response => {
        console.log(response);
        navigate("/");
      })
  }

  // RATING STARS
  const getStars = (rating) => {
    let solidStr = <i className="fa-solid fa-star"></i>
    let emptyStr = <i className="fa-sharp fa-regular fa-star"></i>
    let stars = Math.round(rating)

    if (stars === 0) {
      return <>{emptyStr}{emptyStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 1) {
      return <>{solidStr}{emptyStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 2) {
      return <>{solidStr}{solidStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 3) {
      return <>{solidStr}{solidStr}{solidStr}{emptyStr}{emptyStr}</>
    } else if (stars === 4) {
      return <>{solidStr}{solidStr}{solidStr}{solidStr}{emptyStr}</>
    } else {
      return <>{solidStr}{solidStr}{solidStr}{solidStr}{solidStr}</>
    }
  }


  return (<>
    {isLoading ? (<p>Loading...</p>) : (<><h1 className="h1"> Toilet</h1>

      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="card m-4">
          <div className="card-body">
            <img src={toilet.imageUrl} alt="not working" className="card-text w-50" />
            <p className="card-text">Title: {toilet.title}</p>
            <p className="card-text"> Description: {toilet.description}</p>
            <p className="card-text"> Overall Rating: {getStars(toilet.rating)}</p>
            <p className="card-text">
              {new Date(toilet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              {new Date(toilet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
            <Link to={`/`} className="btn btn-primary"> Go back to other Toilets</Link>
            {/* {user.isAdmin && <button className="btn btn-danger mx-2" onClick={() => deleteHandler(toilet._id)}>Delete</button>}    */}
            <button className="btn btn-danger mx-2" onClick={() => deleteHandler(toilet._id)}>Delete</button>

          </div>
        </div>
      </div>

      <CommentTable toiletComments={toilet.comments} />

      <EditIndividualToilet idToilet={idToilet} /></>)}
  </>



  );
}

export default IndividualToilet;