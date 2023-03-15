import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyToilets from "./MyToilets";
import EditProfilePage from "./EditProfilePage";
import userService from "../../services/user.service";

function ProfilePage() {

  const { idProfile } = useParams();
  const { user, authenticateUser, isLoading, isLoggedIn } = useContext(AuthContext);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [usuario, setUsuario] = useState(null);



  function handleEditProfileClick() {
    setShowEditProfile(!showEditProfile); }

  useEffect(() => {
    authenticateUser();
    userService.getOneProfile(idProfile)
      .then(response => {
        console.log("GET ONE USER ROUTE", response.data)
      setUsuario(response.data)
      
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


  const editProfile = (editOneProfile) => {
    setUsuario(editOneProfile)
}


  return (
    <>
      {!isLoading && isLoggedIn && usuario && user ? (usuario._id === user._id ? (<><h1 className="h1"> My Profile</h1>

      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="card m-4 ">
          <div className="card-body">
            <img src={usuario?.imageUrl} alt="not working" className="card-text" />
            <p className="card-text"> Full Name: {usuario.name}</p>
            <p className="card-text"> Email Adress: {usuario.email}</p>
            <p className="card-text"> Am I an Admin?:  {usuario.isAdmin}</p>

            {/* <p className="card-text">{formattedIat}</p> */}
            <Link to={`/`} className="btn btn-primary">
              {" "}
              Go back to Home Page
            </Link>

          </div>
        </div>
      </div>

      <div>
        <button className="btn btn-primary mb-5" onClick={handleEditProfileClick}>Edit Profile</button>
        {showEditProfile && <EditProfilePage editProfile={editProfile}/>}
        <MyToilets />
      </div></>) : (<p>Este no es tu perfil</p>)) : <p>Loading...</p>}
    </>
  );
}

export default ProfilePage;
