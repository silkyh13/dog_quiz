import React, { useRef, useState } from "react";
import Observer from "./IntersectionObserver";
import { BrowserRouter as Route, Link } from "react-router-dom";

export default function SlideIn() {
  const ref = useRef();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = Observer(ref, "-150px");

  return (
    <div className="content">
      <h1
        style={{
          color: "#d81b60",
          textAlign: " center",
          fontSize: "calc(2vh * 3.4)"
        }}
      >
        How it works
      </h1>
      <div
        ref={ref}
        style={{
          height: "45vh",
          color: onScreen ? "black" : "#d81b60"
        }}
      >
        {onScreen ? (
          <div className="slide-in">
            <div className="animated animatedFadeInUp fadeInUp">
              <div className="procedure">
                <div className="steps">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2014%2F08%2Fnexusae0_thumbtime.png&f=1&nofb=1" />
                  <div className="step">1</div>
                  <div className="step-content">
                    <div>Take The Quiz</div>
                    <div>Test your knowledge</div>
                  </div>
                </div>
                <div className="steps">
                  <img src="http://2.bp.blogspot.com/-hWZzZZbL7Sw/Uoi2FGYVoTI/AAAAAAAAYg4/Z5jrUgKImig/s1600/jake_the_dog_by_car0003-d5td6mx.png" />
                  <div className="step">2</div>
                  <div className="step-content">
                    <div>View Your Score</div>
                    <div>See how well you did</div>
                  </div>
                </div>
                <div className="steps">
                  <img src="https://static1.squarespace.com/static/546406e3e4b024e8934b93cb/t/54bc00c4e4b054d2823da795/1421607109540/board9+copy.png" />
                  <div className="step">3</div>
                  <div className="step-content">
                    <div>Share It </div>
                    <div>Anyone can take it</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div
        style={{
          textAlign: " center"
        }}
      >
        <Link to="/Quiz">
          <button className="loading-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
