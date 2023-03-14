import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import uploadService from "../../services/upload.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleImg = (e) => setImageUrl(e.target.value);


    // ******** this method handles the file upload ********
    const handleFileUpload = (e) => {
      // console.log("The file to be uploaded is: ", e.target.files[0]);
      const uploadData = new FormData();
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("imageUrl", e.target.files[0]);
      console.log("IMAGE URL", imageUrl)

      uploadService
          .uploadImage(uploadData)
          .then(response => {
              // console.log("response is: ", response);
              // response carries "fileUrl" which we can use to update the state
              setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
  };




  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if(imageUrl === "") {
      return;
    }
    // Create an object representing the request body
    const requestBody = { email, password, name, imageUrl };
    authService.signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };






  return (

    <div className="d-flex justify-content-center  ">
    <div className="SignupPage ">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className="d-flex flex-column  justify-content-center ">
        
      <label>Full Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        
        
        
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        


        <label htmlFor="picture" className="form-label ">Upload an Image:</label>
       <input id="picture" type="file" className="form-label" onChange={(e) => handleFileUpload(e)} name="imageUrl" />
      
        <button type="submit" className="m-4">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
    </div>
  );
}

export default SignupPage;
