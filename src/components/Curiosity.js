import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../Curiosity.css";
import ApplicationViews from "./ApplicationViews";
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
  };
  return (
    <>
      {/* <Container>
        <Login hasUser={hasUser} setUser={setUser} {...props} />
      </Container> */}
      <ApplicationViews
        clearUser={clearUser}
        hasUser={hasUser}
        setUser={setUser}
        {...props}
      />
    </>
  );
};

export default withRouter(Curiosity);
