import { Route } from "react-router-dom";
import React, { useState } from "react";
import NewUser from "./NewUser";
import PhotoSearchList from "../components/photos/PhotoSearchList";
import PhotosSaved from "./photos/PhotosSaved";
import DataManager from "../modules/DataManager";

const ApplicationViews = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;
  const credentials = props.credentials;
  const handleLogin = props.handleLogin;
  const setCredentials = props.setCredentials;
  // =====================================================
  // ******  NEW USER STATE STUFF  ******

  return (
    <>
      {/* <Route
        exact
        path="/new_user"
        render={(props) => {
          return (
            <NewUser
              handleNewUserFieldChange={handleNewUserFieldChange}
              credentials={credentials}
              handleLogin={handleLogin}
              setUser={setUser}
              hasUser={hasUser}
              {...props}
            />
          );
        }}
      /> */}
      {/* <Route
      exact
      path="/"
      render={(props) => {
        return (
          <Login
            credentials={credentials}
            userLogin={userLogin}
            handleFieldChange={handleFieldChange}
            setUser={setUser}
            hasUser={hasUser}
            {...props}
          />
        );
      }}
    /> */}
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
    </>
  );
};

export default ApplicationViews;
