/*  eslint-disable*/
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyToilets from "./MyToilets";
import EditProfilePage from "./EditProfilePage";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const { idProfile } = useParams();
  const { user, authenticateUser, isLoading, isLoggedIn } = useContext(AuthContext);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setShowEditProfile(!showEditProfile);
  }

  useEffect(() => {
    authenticateUser();
    userService.getOneProfile(idProfile)
      .then(response => {
        console.log("GET ONE USER ROUTE", response.data)
        setUsuario(response.data)
        setShowEditProfile(false)

      })
      .catch(err => console.log("ERROR PUT", err))
  }, []);

  // console.log("user", user)
  // console.log("usuario", usuario)

  // const formattedIat = new Date(user.iat * 1000).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // }) + " " +
  // new Date(user.iat * 1000).toLocaleDateString("en-GB", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });

  // edit


  // DELETE COMMENT
  const deleteHandler = (idProfile) => {
    userService.deleteProject(idProfile)
      .then(response => {
        console.log(response);
        navigate("/", { replace: true });
      })
  }

  const editProfile = (editOneProfile) => {
    setUsuario(editOneProfile)
  }



  return (
    <>
      <div className="d-flex flex-column flex-wrap align-content-center" >
        {!isLoading && isLoggedIn && usuario && user ? (usuario._id === user._id ? (<><h1 className="h1 text-center" > My Profile</h1>

          <div className="d-flex flex-row flex-wrap justify-content-center">
            <div className="card m-4 ">
              <div className="card-body">
                {/* {!isLoading && <img src={usuario?.imageUrl} alt="not working"  height="100" width="100" className="card-text" />} */}
                <img src="https://hpsnf.com/wp-content/uploads/2021/04/avatar.jpg"
                  onError={(e) => { e.target.onerror = null; e.target.src = "fallback-image-url"; e.target.alt = "Alternate text"; }}
                  alt="Image description"
                />
                <p className="card-text"> User: {usuario.name}</p>
                <p className="card-text">  {usuario.email}</p>
                <p className="card-text"> Am I an Admin?{usuario.isAdmin ? <p> Yes</p> : <p> No</p>}</p>

                {/* <p className="card-text">{formattedIat}</p> */}
                <Link to={`/`} className="btn btn-primary">
                  {" "}
                  Go back to Home Page
                </Link>
                {user.isAdmin && <button className="btn btn-danger mx-2" onClick={() => deleteHandler(user._id)}>Delete</button>}


              </div>
            </div>
          </div>

          <div >
            <div className="text-center">
              <h1>Edit Profile</h1>
              <div className="d-inline-block">
                <button className="btn btn-primary mb-4 p-3" onClick={handleEditProfileClick}>Edit Profile</button>
                {showEditProfile && <EditProfilePage editProfile={editProfile} />}
              </div>
            </div>
            <MyToilets />
          </div></>) : (<p>Este no es tu perfil</p>)) : <p>Loading...</p>}
      </div>
    </>
  );
}

export default ProfilePage;
