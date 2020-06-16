import { Route } from "react-router-dom";
import React from "react";
import Login from "./Login";
// import NewUser from "./NewUser";

const ApplicationViews = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;
  return (
    <>
      {/* <Route
        exact
        path="/new_user"
        render={(props) => {
          return <NewUser setUser={setUser} hasUser={hasUser} {...props} />;
        }}
      /> */}
      <Route
        exact
        path="/"
        render={(props) => {
          return <Login setUser={setUser} hasUser={hasUser} {...props} />;
        }}
      />
    </>
  );
};

export default ApplicationViews;
