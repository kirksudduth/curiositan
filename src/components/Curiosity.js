import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../Curiosity.css";
import ApplicationViews from "./ApplicationViews";
import NavBar from "./NavBar";
import Login from "./Login";
import NewUser from "./NewUser";
import SegmentMod from "./Segment";

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
  return (
    <>
      <SegmentMod {...props} />
      {hasUser ? (
        <>
          <NavBar {...props} clearUser={clearUser} />
          <ApplicationViews
            clearUser={clearUser}
            hasUser={hasUser}
            setUser={setUser}
            {...props}
          />
        </>
      ) : null}
      {!hasUser && props.location.pathname === "/" ? (
        <Login setUser={setUser} hasUser={hasUser} />
      ) : null}
      {!hasUser && props.location.pathname === "/new_user" ? (
        <NewUser setUser={setUser} hasUser={hasUser} />
      ) : null}
    </>
  );
};

export default withRouter(Curiosity);
