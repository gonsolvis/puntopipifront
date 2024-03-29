/*  eslint-disable*/
import userService from "../../services/user.service";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import { useContext, useEffect, useState } from "react"

function MyToilets() {

  const { user } = useContext(AuthContext);
  const [toilets, setToilets] = useState([])

  useEffect(() => {
    userService.getOneProfile(user._id)
      .then((data) => {
        setToilets(data.data.toilets)

      })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <div className="d-flex flex-column align-items-center" >


      {toilets.length === 0 ? (
        <div className="d-flex flex-column align-items-center" ><h2> You have no toilets  </h2> <i className="fa-solid fa-ghost fa-5x"></i></div>
      ) : (
        toilets.map(toilet => (


          <div className="card m-4 p-2" key={toilet._id}>

            <div className="card-body d-flex flex-column justify-content-center">
              <p className="card-text h3">{toilet.title}</p>
              <p className="card-text">{toilet.description}</p>
              <div><img src={toilet.imageUrl} alt="not working" height="200" width="200" className="card-text" /></div>
              <p className="card-text">
                {new Date(toilet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                {new Date(toilet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </p>
              <Link to={`/toilets/${toilet._id}`} className="btn btn-primary">View details</Link>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default MyToilets