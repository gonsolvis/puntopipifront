import "./Navbar.css";
import { Link } from "react-router-dom";
import AddToilet from "../AddToilet/AddToilet";
// import { useContext } from "react";
// import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  let toiletPaperIcon = <i className="fa-solid fa-toilet fa-1x"></i>
  return (
    <>

      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid">
          <Link to="/" className="m-3 navbar-brand ml-100 text-center"> <h1> {toiletPaperIcon} .pipi</h1></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link to="/toilets" className="nav-link">Toilets </Link>
              </li>
              {/* <li className="nav-item">
                <AddToilet className="nav-link"/>
              </li> */}
             <li className="nav-item">
                <Link to="/signup" className="nav-link">Sign Up </Link>
              </li>
             {/* if logged in send to my profile with my toilets, if not send to log in page */}
              <li className="nav-item">
                <Link to="/login" className="nav-link">My Profile </Link>
              </li>
              <li className="nav-item">
              <button className="nav-link">Logout</button>
              </li>
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