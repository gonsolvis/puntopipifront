import "./HomePage.css";
import { useEffect, useState } from "react";
import toiletsService from "../../services/toilets.service"
import { Link } from "react-router-dom";

function HomePage() {
  const [toilets, setToilets] = useState([])

  useEffect(() => {
    toiletsService.getAll()
      .then((data) => {
        setToilets(data.data)

      })
      .catch((err) => {

        console.log(err)
      })

  }, [])

  const getStars = (rating) => {
    let solidStr = <i className="fa-solid fa-star"></i>
    let emptyStr = <i className="fa-sharp fa-regular fa-star"></i>

    
    // let solidStr = <i className="fa-solid fa-toilet-paper"></i>
    // let emptyStr = <i className="fa-sharp fa-regular fa-star"></i>
    let stars = Math.round(rating)

    if (stars === 0) {
      return <>{emptyStr}{emptyStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 1) {
      return <>{solidStr}{emptyStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 2) {
      return <>{solidStr}{solidStr}{emptyStr}{emptyStr}{emptyStr}</>
    } else if (stars === 3) {
      return <>{solidStr}{solidStr}{solidStr}{emptyStr}{emptyStr}</>
    } else if (stars === 4) {
      return <>{solidStr}{solidStr}{solidStr}{solidStr}{emptyStr}</>
    } else {
      return <>{solidStr}{solidStr}{solidStr}{solidStr}{solidStr}</>
    }
  }

  return (
    <>
      <br/>
      <h1> All toilets page </h1>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {toilets.map(toilet => {
          return (
            <div className="card m-4 w-25 " key={toilet._id}>
              <i className="fa-solid fa-toilet fa-1x"></i>
              <div className="card-body">
                <p className="card-text">{toilet.title}</p>
                <p className="card-text">{toilet.description}</p>
                <p className="card-text">{getStars(toilet.rating)}</p>
                <p className="card-text">{toilet.imageUrl}</p>
                <p className="card-text">{toilet.createdAt}</p>
                <Link to={`/toilets/${toilet._id}`} className="btn btn-primary">View details</Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default HomePage;
