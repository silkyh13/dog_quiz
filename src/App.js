import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Quiz from "./Quiz/index";
import LoadingPage from "./HomePage";
import Results from "./Results/index";
import CheatSheet from "./CheatSheet/index";
import "./styles.css";
import ReactGa from "react-ga";
export default function App() {
  const [testSet, setTestSet] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [done, setDone] = useState(false);
  const [selected10, setSelected10] = useState([]);
  const [restart, setRestart] = useState(false);
  const [size, setSize] = useState({ small: [""], medium: [""], large: [""] });
  const [grouped, setGrouped] = useState(false);
  const [dogSet, setDogSet] = useState([]);
  const [gotImages, setGotImages] = useState(false);
  useEffect(() => {
    ReactGa.initialize("UA-197820733-1");
    //report pageview tell google analytics im on a webpage
    ReactGa.pageview(window.location.pathname + window.location.search);
    getDogSet();
    newGame();
  }, []);

  //grouping dogs by size
  useEffect(() => {
    let s = size.small;
    let m = size.medium;
    let l = size.large;
    if (s.length > 1) {
      getImageRequests(s);
      getImageRequests(m);
      getImageRequests(l);
      setGrouped(true);
    }
  }, [size]);

  useEffect(() => {
    //if getDogSet finishes, add image url
    if (dogSet.length > 1) {
      getImageRequests(dogSet);
    }
  }, [dogSet]);

  //making requests to change the data of dog set to include image url
  const getImageRequests = (array) => {
    const requests = array.map((dog) => {
      return getImage(dog);
    });
    Promise.all(requests).then((request) => {
      for (var i = 0; i < request.length; i++) {
        let obj = {
          id: array[i].id,
          name: array[i].name,
          url: request[i],
          height: array[i].height,
        };
        array[i] = obj;
      }
      setGotImages(true);
    });
  };

  //once getImageRequests completed, make test set questions & sort dogSet by height
  useEffect(() => {
    if (gotImages) {
      makeTestSet();
      sortByHeight(dogSet);
    }
  }, [gotImages]);

  //get all the dogs info and save it
  const getDogSet = () => {
    let url = "https://api.thedogapi.com/v1/breeds";
    fetch(url, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        //resJson whole array of dog info
        let copy = resJson.slice();
        setDogSet(copy);
      });
  };

  //sorting by height and saving it in state called size
  const sortByHeight = (dogData) => {
    function groupBy(arr, property) {
      return arr.reduce(function (memo, x) {
        //check of height is more than 18
        const size = x[property].imperial.split("-")[0];
        let group = null;
        if (size < 12) {
          group = "small";
        } else if (size > 20) {
          group = "large";
        } else {
          group = "medium";
        }
        if (!memo[group]) {
          memo[group] = [];
        }
        memo[group].push(x);
        return memo;
      }, {});
    }
    var o = groupBy(dogData, "height");
    console.log(
      "what does small set look like?",
      o.small[0],
      o.medium[0],
      o.large[0]
    );
    setSize(o);
  };
  //choose set of 10 and 4 answers
  const makeTestSet = () => {
    let randomDog;
    let theFourChoices = [];
    let questionsSet = [];
    let selectedDogInfo = [];
    for (let i = 0; i < 10; i++) {
      theFourChoices = [];
      for (let j = 0; j < 4; j++) {
        randomDog = getRandomInt(dogSet.length);
        while (theFourChoices.includes(dogSet[randomDog])) {
          randomDog = getRandomInt(dogSet.length);
        }
        theFourChoices.push(dogSet[randomDog]);
      }
      let selectedDog = theFourChoices[getRandomInt(3)];
      selectedDogInfo.push(selectedDog);
      questionsSet.push(theFourChoices);
    }
    setTestSet(questionsSet);
    setSelected10(selectedDogInfo);
  };

  const newGame = () => {
    setCorrect(0);
    setWrong(0);
    setDone(false);
    setRestart(false);
  };
  const handleValue = (answer, choice) => {
    if (answer === choice) {
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
    }
    setDone(true);
  };
  //choose one dog to get an image
  const getImage = async (info) => {
    let result = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${info.id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        return resJson[0].url;
      });
    return result;
  };
  const handleNewGame = () => {
    newGame();
    makeTestSet();
  };
  return (
    <Router>
      <div className="App">
        <Results spinner={spinner} setSpinner={setSpinner} correct={correct} />

        <div className="header">
          <h1 className="logo" onClick={handleNewGame}>
            <Link to="/">DogQuiz</Link>
          </h1>
          <ul className="main-nav">
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
            <li onClick={handleNewGame}>
              <Link to="/cheat-sheet">Dog Breeds</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/cheat-sheet">
            <CheatSheet size={size} grouped={grouped} />
          </Route>
          <Route path="/quiz">
            <Quiz
              correct={correct}
              wrong={wrong}
              selected={selected10}
              testSet={testSet}
              handleValue={handleValue}
              done={done}
              setDone={setDone}
              newGame={newGame}
              setSpinner={setSpinner}
              setRestart={setRestart}
              restart={restart}
              makeTestSet={makeTestSet}
            />
          </Route>
          <Route path="/">
            <LoadingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
