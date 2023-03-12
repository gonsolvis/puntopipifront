import "./ProfilePage.css";
import { useContext, useEffect } from "react";
// import { useState } from "react"
// import { useParams } from "react-router";
// import { userContext } from "../../context/user.context";
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom";


function ProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    authenticateUser();
  }, []);

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
        <div className="card m-4 w-25 ">
          <div className="card-body">
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.name}</p>
            <p className="card-text">{user.imageUrl}</p>
            {/* <p className="card-text">{formattedIat}</p> */}
            <Link to={`/`} className="btn btn-primary">
              {" "}
              Go back to Home Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
