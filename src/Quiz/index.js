import React, { useState, useEffect } from "react";
import ReactGa from "react-ga";
export default function Quiz({
  correct,
  wrong,
  selected,
  testSet,
  handleValue,
  done,
  setDone,
  newGame,
  setSpinner,
  setRestart,
  restart,
  makeTestSet,
}) {
  const [currIndex, setCurrIndex] = useState(0);
  const [translateVal, setTranslateVal] = useState(0);
  const [timeStart, setTimeStart] = useState(new Date());
  const handleTimeDiff = () => {
    var timeEnd = new Date();
    var timeDiff = timeEnd - timeStart;
    // console.log(timeDiff / 1000);
    ReactGa.timing({
      category: "User chose an answer",
      variable: "choice-button",
      value: timeDiff, // in milliseconds
    });
  };
  const resetTimeStart = () => {
    setTimeStart(new Date());
  };
  let questionDiv = [];

  if (selected.length) {
    for (let i = 0; i < testSet.length; i++) {
      //the set of four choices
      let question = testSet[i];
      //turning four choices into buttons
      const buttonChoices = question.map((item, idx) => (
        <button
          key={idx}
          className={
            "choice-button " +
            (!done
              ? "choice-remove-button"
              : selected[i].name === item.name
              ? "correct"
              : "wrong")
          }
          onClick={(e) => {
            handleTimeDiff();
            if (!done) {
              handleValue(selected[i].name, item.name);
            }
            if (currIndex === imagesLength) {
              setRestart(true);
              setSpinner(true);
            }
          }}
        >
          <div>{item.name}</div>
        </button>
      ));
      questionDiv.push(
        <div className="post" key={i} id="pic">
          <div className="image-container">
            <img src={selected[i].url} alt="dog" className="image" />
          </div>
          <h2>{i + 1}. What is this?</h2>
          <div className="btn-flex">{buttonChoices}</div>
        </div>
      );
    }
  }
  const widthOfQuestionItem = () => {
    //const questionItem = document.getElementById("wrapper");
    //console.log(questionItem, "wjat os it", questionItem.clientWidth);
    // return 640;
    return 792;
  };
  const imagesLength = selected.length - 1;
  const nextQuestion = () => {
    //if we are at the last question, there should be an option to restart
    if (currIndex === imagesLength) {
      setRestart(true);
      setSpinner(true);
    } else {
      setCurrIndex(currIndex + 1);
      setTranslateVal(translateVal + -widthOfQuestionItem());
      setDone(false);
    }
    resetTimeStart();
  };
  return (
    <div className="main-flex-container">
      <h1>Quiz</h1>
      <div className="score-container">
        <h3>
          correct: <span>{correct} </span>
        </h3>
        <h3>
          wrong: <span>{wrong} </span>
        </h3>
      </div>

      <div className="content-container">
        <div id="wrapper">
          <div
            className="moving-questions"
            style={{
              transform: `translateX(${translateVal}px)`,
            }}
          >
            {questionDiv}
          </div>
          <div className="bubble-button-container">
            {currIndex === imagesLength && restart ? (
              <button
                className="bubbles-button restart"
                onClick={() => {
                  newGame();
                  setCurrIndex(0);
                  setTranslateVal(0);
                  makeTestSet();
                }}
              >
                Start Over
                <span />
                <span />
                <span />
                <span />
              </button>
            ) : (
              <button onClick={nextQuestion} className="bubbles-button restart">
                {done ? "continue" : "skip"}
                <span />
                <span />
                <span />
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="main-footer">
        <p>Dogs Quiz &copy; 2020, All Rights Reserved</p>
      </div>
    </div>
  );
}
