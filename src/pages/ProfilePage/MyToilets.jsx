import userService from "../../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import { useContext, useEffect, useState } from "react"



function MyToilets() {

    // const [myToilet, setToilet ] = useState([])
    const { user } = useContext(AuthContext);
    const [toilets, setToilets] = useState([])

    // const navigate = useNavigate();

    useEffect(()=>{
        userService.getOneProfile(user._id)
        .then((data)=>{
            setToilets(data.data.result.toilets)
            console.log(data.data.result.toilets)
        })
        .catch((err)=>{console.log(err)})
    },[])
    
    return (
    <div className="d-flex flex-column align-items-center " >
    <h1>My toilets in profile</h1>

    {toilets && toilets.map(toilet => {
          return (
            <div className="card m-4 p-2" key={toilet._id}>
                <div className="card-body">
                <p className="card-text">{toilet._id}</p>
                <p className="card-text">{toilet.title}</p>
                <p className="card-text">{toilet.description}</p>
                {/* <p className="card-text">{getStars(toilet.rating)}</p> */}
                <img  src={toilet.imageUrl} alt="not working" className="card-text"/> 
                <p className="card-text">
                  {new Date(toilet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                  {new Date(toilet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
               </p>
                <Link to={`/toilets/${toilet._id}`} className="btn btn-primary">View details</Link>
              </div>
            </div>
          )
        })}

    </div>
  );
}


export default MyToilets