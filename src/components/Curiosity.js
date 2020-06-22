import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../Curiosity.css";
import ApplicationViews from "./ApplicationViews";
import NavBar from "./NavBar";
import Login from "./Login";

const Curiosity = (props) => {
  const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = (user) => {
    sessionStorage.setItem("credentials", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };

  const clearUser = () => {
    sessionStorage.clear();
    setHasUser(isAuthenticated());
    props.history.push("/");
  };

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [credentials, setCredentials] = useState({
    username: "",
    id: "",
  });

  const handleFieldChange = (evt) => {
    const stateToChange = { ...userLogin };
    stateToChange[evt.target.id] = evt.target.value;
    setUserLogin(stateToChange);
  };

  const handleLogin = () => {
    setUser(credentials);
    props.history.push("/photos_search");
  };

  return (
    <>
      {hasUser ? (
        <>
          <NavBar {...props} clearUser={clearUser} />
          <ApplicationViews
            clearUser={clearUser}
            hasUser={hasUser}
            setUser={setUser}
            credentials={credentials}
            setCredentials={setCredentials}
            {...props}
          />
        </>
      ) : (
        <Login
          credentials={credentials}
          userLogin={userLogin}
          handleFieldChange={handleFieldChange}
          setUser={setUser}
          hasUser={hasUser}
          handleLogin={handleLogin}
          setCredentials={setCredentials}
        />
      )}
    </>
  );
};

export default withRouter(Curiosity);
