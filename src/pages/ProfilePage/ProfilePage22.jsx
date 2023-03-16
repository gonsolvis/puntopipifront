// import "./ProfilePage.css";
// import { useEffect, useState } from "react";
// import userService from "../../services/user.service";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";



// function ProfilePage() {
//   let { idProfile } = useParams();
//   const [profiles, setProfile] = useState({})

//   console.log("PARAMS details", idProfile)

//   useEffect(() => {
//     userService.getOneProfile(idProfile)
//       .then((data) => {
//         setProfile(data.data)
//       })
//       .catch((err) => {
//         console.log(err)
//       })


//   }, []);


//   return (
//     <>
//       <h1 className="h1"> IndividualToilet</h1>

//       <div className="d-flex flex-row flex-wrap justify-content-center">
//         <div className="card m-4 w-25 " key={profiles._id}>
//           <div className="card-body">
//             <p className="card-text">{profiles.email}</p>
//             <p className="card-text">{profiles.name}</p>
//             <p className="card-text">{profiles.imageUrl}</p>
//             <Link to={`/`} className="btn btn-primary"> Go back to other Toilets</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfilePage;
