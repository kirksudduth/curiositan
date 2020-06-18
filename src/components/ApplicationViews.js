import { Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./Login";
import NewUser from "./NewUser";
import PhotoSearchForm from "../components/photos/PhotoSearchForm";

const ApplicationViews = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = () => {
    setUser(credentials);
    props.history.push("/photos_search");
  };

  return (
    <>
      <Route
        exact
        path="/new_user"
        render={(props) => {
          return (
            <NewUser
              handleLogin={handleLogin}
              setUser={setUser}
              hasUser={hasUser}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/"
        render={(props) => {
          return <Login setUser={setUser} hasUser={hasUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/photos_search"
        render={(props) => {
          return <PhotoSearchForm {...props} />;
        }}
      />
    </>
  );
};

export default ApplicationViews;
