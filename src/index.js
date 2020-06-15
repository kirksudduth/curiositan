import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Curiosity from "./components/Curiosity";

ReactDOM.render(
  <>
    <Router>
      <Curiosity />
    </Router>
  </>,
  document.getElementById("root")
);
