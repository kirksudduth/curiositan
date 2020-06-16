import React, { useState, useEffect } from "react";
import {
  Segment,
  Image,
  Header,
  Form,
  Grid,
  Icon,
  Input,
  Button,
  Message,
  Popup,
  Checkbox,
  Modal,
} from "semantic-ui-react";
import DataManager from "../modules/DataManager";

const Login = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState({ error: false });

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const checkUser = (event) => {
    event.preventDefault();
    DataManager.getUserByEmail(credentials.email).then((user) => {
      console.log(user[0]);
      if (user[0] === undefined) {
        window.alert("invalid email");
      } else if (credentials.password !== user[0].password) {
        window.alert("wrong password");
      } else if (
        credentials.email === user[0].email &&
        credentials.password === user[0].password
      ) {
        // return <Popup content="Incorrect Email or Password" />;
        // window.alert("Incorrect Email or Password");
        handleLogin();
        console.log("YOU IN, BEHBEH");
      }
    });
  };

  const handleLogin = () => {
    setUser(credentials);
    props.history.push("/photos_search");
  };

  return (
    <>
      <Header
        content="Red Planet: A Curiosity"
        block
        textAlign="center"
        as="h1"
      />
      <Grid centered columns={2}>
        <Grid.Column>
          <Header content="Login" as="h2" textAlign="center" />
          <Segment>
            <Form onSubmit={checkUser} size="large" className="loginForm">
              <Form.Input
                // error={}
                type="email"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                id="email"
                onChange={handleFieldChange}
              />
              <Form.Input
                placeholder="Password"
                icon="lock"
                iconPosition="left"
                type="password"
                id="password"
                onChange={handleFieldChange}
              />
              <Form.Field>
                <Checkbox label="Remember me" />
              </Form.Field>
              <Button fluid color="blue" size="medium" type="submit">
                Login
              </Button>
            </Form>
          </Segment>
          <Message>
            Not registered yet? <a href="/new_user">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
