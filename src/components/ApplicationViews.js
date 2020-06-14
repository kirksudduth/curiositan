import { Route } from "react-router-dom";
import React from "react";
import Home from "./home/Home";

const ApplicationViews = () => {
  return (
    <>
      <Route
        exact
        path="/"
        render={(props) => {
          return <Home />;
        }}
      />
    </>
  );
};

export default ApplicationViews;
