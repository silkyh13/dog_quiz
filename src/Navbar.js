import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import LoadingPage from "./Loading";
export default function Navbar({ setLoading }) {
  return (
    <Router>
      <div>
        <div className="header">
          <h1 className="logo">
            <a href="Home">Dog Quiz</a>
          </h1>
          <ul className="main-nav">
            <li
              onClick={e => {
                setLoading(true);
              }}
            >
              <Link to="/LoadingPage">Home</Link>
            </li>
            <li
              onClick={e => {
                setLoading(false);
              }}
            >
              <Link to="/App">Quiz</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/LoadingPage">
            <LoadingPage />
          </Route>
          <Route path="/App">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
