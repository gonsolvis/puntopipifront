import { Link } from "react-router-dom";




function Footer() {
  return (
<footer className="containerFooter p-5">
  <div className="container">
    <div className="row justify-content-between justify-content-center text-center">
      <div className="col-sm-4 mb-4 mb-sm-0">
        <Link to="#" className="nav-link">Privacy Policy</Link>
      </div>
      <div className="col-sm-4 mb-4 mb-sm-0">
        <Link to="#" className="nav-link">Disclaimers</Link>
      </div>
      <div className="col-sm-4 mb-4 mb-sm-0">
        <Link to="#" className="nav-link">Cookies</Link>
      </div>
    </div>
    <div className="row justify-content-end justify-content-center text-center">
      <div className="col-lg-4 mt-4 mt-lg-0">
        <span id="copyr">© 2020-2023 PuntoPipi Inc. All rights reserved</span>
      </div>
    </div>
  </div>
</footer>
      );
    }
    

     



export default Footer;