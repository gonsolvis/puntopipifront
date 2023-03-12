import { useEffect, useState } from "react";
import toiletsService from "../services/toilets.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


let toiletPaperIcon = <i className="fa-solid fa-toilet fa-1x"></i>

function IndividualToilet() {
    let { toiletId } = useParams();

  const [toiletsIdState, setToiletId] = useState({})
 

  useEffect(() => {
    toiletsService.getOne(toiletId)
      .then((data) => {
        setToiletId(data.data)
     })
      .catch((err) => {
        console.log(err)})

  },[]);
  console.log(toiletId)
  return (
    <>
    <br/>
    <h1> TESTING PAGE</h1>

    {/* <AddToilet /> */}
    <div className="d-flex flex-row flex-wrap justify-content-center">        
      <div className="card m-4 w-25 ">
      {toiletPaperIcon}
          <div className="card-body">
          <p className="card-text">{toiletsIdState.title}</p>
            <p className="card-text">{toiletsIdState.description}</p>
            <p className="card-text">{toiletsIdState.rating}</p>
            <p className="card-text">{toiletsIdState.imageUrl}</p>
                 <Link to={`/toilets/}`} className="btn btn-primary"> Go back to other Toilets</Link>
          </div>
       </div> 
</div>

    

    </>
  
  );
}

export default IndividualToilet;