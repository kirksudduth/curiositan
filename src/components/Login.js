import React from "react";
import {
  Segment,
  Header,
  Form,
  Grid,
  Message,
  Checkbox,
  Button,
} from "semantic-ui-react";
import DataManager from "../modules/DataManager";

const Login = (props) => {
  console.log(props);
  const handleLogin = props.handleLogin;
  const credentials = props.credentials;
  const handleFieldChange = props.handleFieldChange;
  const setUser = props.setUser;
  const userLogin = props.userLogin;
  const setCredentials = props.setCredentials;

  const setUpCredentials = (user) => {
    const stateToChange = { ...credentials };
    stateToChange.username = user[0].username;
    stateToChange.id = user[0].id;
    setCredentials(stateToChange);
  };

  const checkUser = (event) => {
    event.preventDefault();
    DataManager.getUserByEmail(userLogin.email).then((user) => {
      if (user[0] === undefined) {
        window.alert("invalid email");
      } else if (userLogin.password !== user[0].password) {
        window.alert("wrong password");
      } else if (
        userLogin.email === user[0].email &&
        userLogin.password === user[0].password
      ) {
        setUpCredentials(user);
        handleLogin();
      }
    });
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
