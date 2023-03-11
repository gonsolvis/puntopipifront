import "./HomePage.css";
// import ToiletsListPage from "../ToiletsListPage";
import { useEffect, useState } from "react";
import toiletsService from "../../services/toilets.service"
import { Link } from "react-router-dom";
// import AddToilet from "../../components/AddToilet";

let toiletPaperIcon = <i className="fa-solid fa-toilet fa-1x"></i>

function HomePage() {
  const [toilets, setToilets] = useState(0)
  useEffect(() => {
    toiletsService.getAll()
      .then((data) => {
        setToilets(data.data)

      })
      .catch((err) => {

        console.log(err)
      })

  },

    []
  )
  console.log(toilets)
  return (
    <>
    <br/>
    <h1> TESTING PAGE</h1>

    {/* <AddToilet /> */}
    <div className="d-flex flex-row flex-wrap justify-content-center">
    {toilets.map(toilet => {
        return (
          
      <div className="card m-4 w-25 " key={toilet._id}>
      {toiletPaperIcon}
          <div className="card-body">
          <p className="card-text">{toilet.title}</p>
            <p className="card-text">{toilet.description}</p>
            <p className="card-text">{toilet.rating}</p>
            <p className="card-text">{toilet.imageUrl}</p>
                 <Link to={`/toilets/${toilet._id}`} className="btn btn-primary">View details</Link>
          </div>
       </div>
)})}
 
</div>

    

    </>
  
  );
}

export default HomePage;