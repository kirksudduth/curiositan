import { Route } from "react-router-dom";
import React from "react";
import PhotoSearchList from "../components/photos/PhotoSearchList";
import PhotosSaved from "./photos/PhotosSaved";
import Curiositans from "./curiositans/Curiositans";

const ApplicationViews = () => {
  return (
    <>
      <Route
        exact
        path="/photos_search"
        render={(props) => {
          return <PhotoSearchList {...props} />;
        }}
      />
      <Route
        exact
        path="/saved_photos"
        render={(props) => {
          return <PhotosSaved {...props} />;
        }}
      />
      <Route
        exact
        path="/curiositans"
        render={(props) => {
          return <Curiositans {...props} />;
        }}
      />
    </>
  );
};

export default ApplicationViews;
