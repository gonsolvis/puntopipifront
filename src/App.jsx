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
      {/* This is the homepage full of maps */}
        <Route path="/" element={<HomePage />} />

        <Route path="/toilets/:toiletId`" element={
          <IsAnon>
            <IndividualToilet />
          </IsAnon>} />

          <Route path="/comment" element={
          <IsAnon>
            <CommentTable />
          </IsAnon>} />


        <Route path="/profile" element={
          <IsPrivate>
            <ProfilePage />
          </IsPrivate>} />

        <Route path="/signup" element={<IsAnon>
          <SignupPage />
        </IsAnon>} />

        <Route path="/login" element={
          <IsAnon>
            <LoginPage />
          </IsAnon>} />

          <Route path="/new" element={<IsAnon>
          <AddToilet />
        </IsAnon>} />

        <Route path="/about" element={
          <IsAnon>
            <About />
          </IsAnon>} />

          

        <Route path="*" element={
          <IsAnon>
            <NotFoundPage />
          </IsAnon>} />

      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;
