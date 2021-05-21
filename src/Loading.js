import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import SlideIn from "./SlideIn";
export default function LoadingPage({ setLoading }) {
  return (
    <div className="home-page">
      <div id="loader">
        <div className="content">
          <h2>Dog Breed Guessing Game</h2>
          <p>
            Can you believe how many dog breeds there are? The AKC recognizes
            190 breeds, but there are even more than that out there. Do you
            think you can name them all? Test your knowledge with this quiz.
          </p>
          <div className="home-button">
            <Link to="/Quiz">
              <button className="loading-button">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      <SlideIn />
      <div id="main-footer">
        <p>Dogs Quiz &copy; 2020, All Rights Reserved</p>
      </div>
    </div>
  );
}
