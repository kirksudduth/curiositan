import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Curiosity from "./components/Curiosity";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Curiosity />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
