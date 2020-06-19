import { Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./Login";
import NewUser from "./NewUser";
import PhotoSearchList from "../components/photos/PhotoSearchList";
import DataManager from "../modules/DataManager";

const ApplicationViews = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;

  // 88888888888 Login Stuff 88888888888888
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = () => {
    setUser(credentials);
    props.history.push("/photos_search");
  };
  // 88888888888 End Login Stuff 8888888888888
  // =====================================================
  // ******  NEW USER STATE STUFF  ******
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleNewUserFieldChange = (evt) => {
    const stateToChange = { ...newUser };
    const otherStateToChange = { ...credentials };
    otherStateToChange[evt.target.id] = evt.target.value;
    stateToChange[evt.target.id] = evt.target.value;
    setNewUser(stateToChange);
    setCredentials(otherStateToChange);
  };

  const handleNewUserLogin = () => {
    setNewUser();
    DataManager.addNewUser(newUser);
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
              handleNewUserLogin={handleNewUserLogin}
              newUser={newUser}
              handleNewUserFieldChange={handleNewUserFieldChange}
              credentials={credentials}
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
          return (
            <Login
              credentials={credentials}
              handleFieldChange={handleFieldChange}
              setUser={setUser}
              hasUser={hasUser}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/photos_search"
        render={(props) => {
          return <PhotoSearchList {...props} />;
        }}
      />
    </>
  );
};

export default ApplicationViews;
