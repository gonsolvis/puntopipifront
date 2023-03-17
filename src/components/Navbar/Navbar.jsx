import "./Navbar.css";
import { Link } from "react-router-dom";
import AddToilet from "../AddToilet/AddToilet";
import { useContext, useState, } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // console.log(user)
  const [ProfileId, setProfileID] = useState("");

  // user?._id || ''
  return (
    <>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="m-2 navbar-brand text-center"> <h1 className="px-4" id="navTitle">  .PuntoPipí</h1></Link>
          <button className="navbar-toggler mr-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">

              <li className="nav-item">
                <Link to="/" className="nav-link">All Toilets </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/add-toilet" className="nav-link">Add Toilet</Link>
                  </li>
                  <li className="nav-item">
                    {/* <Link to="/profile" className="nav-link">My Profile </Link> */}
                    <Link to={`/profile/${user?._id}`} className="nav-link">My Profile </Link>
                 </li>
                 <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={logOutUser}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Log In </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Sign Up </Link>
                  </li>
                 
              </>
              )}

              <li className="nav-item">
                <Link to="/about" className="nav-link">About </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>


    </>
  );
}

export default Navbar;