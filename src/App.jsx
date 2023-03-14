import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import About from "./pages/About"

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Footer from "./components/Navbar/Footer";
import AddToilet from "./components/AddToilet/AddToilet";
import IndividualToilet from "./pages/IndividualToilet";
import CommentTable from "./components/comments/CommentTable";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route path="/" element={<HomePage />} />
      
        <Route path="/toilets/:idToilet" element={<IndividualToilet />} />

          <Route path="/comment" element={<CommentTable />} />


        <Route path="/profile/:idProfile" element={<ProfilePage />} />

        <Route path="/signup" element={<IsAnon>
          <SignupPage />
        </IsAnon>} />

        <Route path="/login" element={
          <IsAnon>
            <LoginPage />
          </IsAnon>} />

   
        <Route path="/toilets/new" element={<AddToilet/>} />

        <Route path="/about" element={<About />} />
          
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;
