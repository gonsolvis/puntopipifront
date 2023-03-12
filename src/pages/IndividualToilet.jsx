import { useEffect, useState } from "react";
import toiletsService from "../services/toilets.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CommentTable from "../components/comments/CommentTable";
import CommentRow from "../components/comments/CommentRow"


let toiletPaperIcon = <i className="fa-solid fa-toilet fa-1x"></i>

function IndividualToilet() {
    let { idToilet } = useParams();
    console.log("PARAMS details", idToilet)

  const [toilet, setToiletId] = useState({})
 

  useEffect(() => {
    toiletsService.getOne(idToilet)
      .then((data) => {
        setToiletId(data.data)
     })
      .catch((err) => {
        console.log(err)})

  },[]);
  console.log("toilet details", idToilet)

  return (
    <>
        <h1 className="h1"> IndividualToilet</h1>

    <div className="d-flex flex-row flex-wrap justify-content-center">        
      <div className="card m-4 w-25 " key={toilet._id}>
      {toiletPaperIcon}
          <div className="card-body">
          <p className="card-text">{toilet.title}</p>
            <p className="card-text">{toilet.description}</p>
            <p className="card-text">{toilet.rating}</p>
            <p className="card-text">{toilet.imageUrl}</p>
                 <Link to={`/`} className="btn btn-primary"> Go back to other Toilets</Link>
          </div>
       </div> 
</div>
<CommentRow/>
<CommentTable/>
    </>
  
  );
}

export default IndividualToilet;