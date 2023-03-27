/*  eslint-disable*/
import { useEffect, useState, useContext } from "react";
import toiletsService from "../services/toilets.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CommentTable from "../components/comments/CommentTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditIndividualToilet from "../pages/EditIndividualToilet"
import { GrEdit } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsInfoSquare } from 'react-icons/bs';






function IndividualToilet() {
 
  const { user } = useContext(AuthContext);
  console.log("USER?", user)
  let { idToilet } = useParams();

  const [toilet, setToilet] = useState({ comments: "patata" })
  const [isLoading, setIsLoading] = useState(true)
  const [isSameUser, setisSameUser] = useState("")
  const [showEditToilet, setShowEditToilet] = useState(false);
 
    console.log("USER2?", user)

  const navigate = useNavigate();

  useEffect(() => {
    toiletsService.getOne(idToilet)
      .then((data) => {
        setToilet(data.data)
        setIsLoading(false)
        setisSameUser(data.data.creator._id)
        setTimeout(() => {
console.log("who am i", data.data)

        },)
      })
      .catch((err) => {
        console.log(err)
      })

  }, []);


    //   // EDIT COMMENT
  function handleEditToiletClick() {
    setShowEditToilet(!showEditToilet);
  }

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
    {isLoading ? (<p>Loading...</p>) : (<><h1 className="h1 font-italic mx-2"> Toilet</h1>

      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="card m-4">
          <div className="card-body">

            <div className=" d-flex justify-content-center ">
              <img src={toilet ? toilet.imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/800px-Cat_August_2010-4.jpg"} alt="not working" className="w-25" />
            </div >
            <p className="card-text h2 font-weight-bold "> Toilet Information <BsInfoSquare /></p>
            <br/>
            <p className="card-text h3"> {toilet.title}</p>
            <p className="card-text"> "{toilet.description}"</p>
            <p className="card-text text-secondary "> {toilet.address}</p>
            <p className="card-text"><span className="text-primary">  Rating: </span>  {getStars(toilet.rating)}</p>
            <p className="card-text"> <span className="text-primary">  Cleanliness: </span>  {getStars(toilet.clean)}</p>
            <p className="card-text font-weight-normal"> <span className="text-primary"> Created by: </span> {toilet.creator.name}</p>
            <p className="card-text">  <span className="text-primary">  Date Added: </span>
              {new Date(toilet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              {new Date(toilet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
             
            <div className=" d-flex justify-content-center">
              <Link to={`/`} className="btn btn-primary"> See more toilets</Link>
            </div >

            <div className=" d-flex justify-content-center">
              {(user?.isAdmin || (user?._id && user._id === isSameUser)) && (
                <button className="btn btn-danger mx-2 mt-3" onClick={() => deleteHandler(toilet._id)}>Delete <AiOutlineDelete /></button>
              )}
            </div >
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="d-inline-block">
          {(user?.isAdmin || (user?._id && user._id === isSameUser)) && <button className="btn btn-primary mb-5 p-2" onClick={handleEditToiletClick}>Edit Toilet <GrEdit /> </button>}
          {showEditToilet && <EditIndividualToilet editToilet={editToilet} idToilet={idToilet} />}
        </div>
      </div>

      <CommentTable toiletComments={toilet.comments} />
     

    </>)}





  </>



  );
}

export default IndividualToilet;