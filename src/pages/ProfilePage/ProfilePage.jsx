import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom";
import MyToilets from "./MyToilets";
import EditProfilePage from "./EditProfilePage";


function ProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);

  const [showEditProfile, setShowEditProfile] = useState(false);

  function handleEditProfileClick() {
    setShowEditProfile(!showEditProfile);
  }



  useEffect(() => {
    authenticateUser();
  }, []);

  console.log(user)

  // const formattedIat = new Date(user.iat * 1000).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // }) + " " +
  // new Date(user.iat * 1000).toLocaleDateString("en-GB", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });

  return (
    <>
      <h1 className="h1"> My Profile</h1>

      <div className="d-flex flex-row flex-wrap justify-content-center">
        <div className="card m-4 ">
          <div className="card-body">
          <p className="card-text">{user.imageUrl}</p>
              <p className="card-text"> Full Name: {user.name}</p>
                <p className="card-text"> Email Adress: {user.email}</p>
    
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

        {showEditProfile && <EditProfilePage />}


        <MyToilets />
      </div>
    </>
  );
}

export default ProfilePage;
