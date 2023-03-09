import { Link } from "react-router-dom";




function Footer() {
  return (
    <footer className="containerFooter p-5">
    <ul className="row justify-content-between w-100">
       <li className="col-4 list-unstyled text-center"><Link to="#" className="nav-link">Privacy Policy </Link></li>
       <li className="col-4 list-unstyled text-center"><Link to="#" className="nav-link">Disclaimers </Link></li>
       <li className="col-4 list-unstyled text-center"><Link to="#" className="nav-link">Cookies </Link></li>
    </ul>
    <span className="text-right text-lg" id="copyr"> © 2013-2023 PuntoPipi Inc. All rights reserved </span>
  </footer>
      );
    }
    

     



export default Footer;