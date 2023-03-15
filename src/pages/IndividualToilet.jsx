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


  const { user } = useContext(AuthContext);
  const [toilet, setToilet] = useState({ comments: "patata" })
  const [isLoading, setIsLoading] = useState(true)
  const [isSameUser, setisSameUser] = useState("")
  const [showEditToilet, setShowEditToilet] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    toiletsService.getOne(idToilet)
      .then((data) => {
        setToilet(data.data)
        setIsLoading(false)
        setisSameUser(data.data.creator._id)
        setTimeout(()=> {
          
          
       }, )
      })
      .catch((err) => {
        console.log(err)
      })

  }, []);


console.log("hello auth context", user)


console.log("hello state", isSameUser)


  // EDIT
  function handleEditToiletClick() {
    setShowEditToilet(!showEditToilet); }

    const editToilet = (editOneToilet) => {
          setToilet(editOneToilet)
          setShowEditToilet(false);
    }
    

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
            <img src={toilet ? toilet.imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/800px-Cat_August_2010-4.jpg"} alt="not working" className="card-text w-50" />
            <p className="card-text">Title: {toilet.title}</p>
            <p className="card-text"> Description: {toilet.description}</p>
            <p className="card-text"> Overall Rating: {getStars(toilet.rating)}</p>
            <p className="card-text">
              {new Date(toilet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              {new Date(toilet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
            <Link to={`/`} className="btn btn-primary"> Go back to other Toilets</Link>
            {(user.isAdmin || (user._id && user._id === isSameUser)) && (
  <button className="btn btn-danger mx-2" onClick={() => deleteHandler(toilet._id)}>Delete</button>
)}






  


          </div>
        </div>
      </div>
      
      {/* <button className="btn btn-primary mb-5" onClick={handleEditToiletClick}>Edit Toilet</button>
{showEditToilet && <EditIndividualToilet editToilet={editToilet} idToilet={idToilet} />} */}

      {user._id === isSameUser ? <button className="btn btn-primary mb-5" onClick={handleEditToiletClick}>Edit Toilet</button> : null}
{showEditToilet && <EditIndividualToilet editToilet={editToilet} idToilet={idToilet} />}

      <CommentTable toiletComments={toilet.comments} />

 </>)}


      
     
      
  </>



  );
}

export default IndividualToilet;