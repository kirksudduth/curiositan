import { Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./Login";
import NewUser from "./NewUser";
import PhotoSearchForm from "../components/photos/PhotoSearchForm";
import PhotoSearchList from "../components/photos/PhotoSearchList";
import DataManager from "../modules/DataManager";

const ApplicationViews = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;

  // 88888888888 Login Stuff 88888888888888
  const [credentials, setCredentials] = useState({ email: "", password: "" });
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

  // ******  END NEW USER STATE STUFF  ******
  // ========================================================
  // 3333333333 Date and Camera States 3333333333

  const [date, setDate] = useState({ date: "" });
  // const [cameras, setCameras] = useState([]);
  const [camValue, setCamValue] = useState({ value: "" });

  const handleDateFieldChange = (evt) => {
    evt.persist();
    const stateToChange = { ...date };
    stateToChange.date = evt.target.value;
    setDate(stateToChange);
  };

  // const getCameras = (date) => {
  //   DataManager.getManifest(date).then((obj) => {
  //     const camerasArray = obj.cameras;
  //     setCameras(camerasArray);
  //   });
  // };

  const handleRadioChange = (evt) => {
    evt.persist();
    const stateToChange = { ...camValue };
    stateToChange.value = evt.target.innerText;
    setCamValue(stateToChange);
  };

  // 33333333333333 End Date and Camera States 3333333333333

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
          return (
            <PhotoSearchForm
              credentials={credentials}
              handleDateFieldChange={handleDateFieldChange}
              handleRadioChange={handleRadioChange}
              date={date}
              camera={camValue}
              // getCameras={getCameras}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/photos_search_list"
        render={(props) => {
          return (
            <PhotoSearchList
              date={date}
              camera={camValue}
              credentials={credentials}
              {...props}
            />
          );
        }}
      />
    </>
  );
};

export default ApplicationViews;
