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
} from "semantic-ui-react";
import DataManager from "../modules/DataManager";

const Login = (props) => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
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
            <Form size="large" className="loginForm">
              <Form.Input
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
              <Button
                fluid
                color="blue"
                size="medium"
                onClick={setUser(credentials)}
              >
                Login
              </Button>
            </Form>
          </Segment>
          <Message>
            Not registered yet? <a href="c">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
