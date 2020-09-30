import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Segment,
  Header,
  Form,
  Grid,
  Message,
  Checkbox,
  Button,
  Image,
} from "semantic-ui-react";
import DataManager from "../modules/DataManager";

const Login = (props) => {
  const setUser = props.setUser;

  const [credentials, setCredentials] = useState({});

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = () => {
    setUser(credentials);
    props.history.push("/photos_search");
  };

  const checkUser = (event) => {
    event.preventDefault();
    DataManager.getUserByEmail(credentials.email).then((user) => {
      if (user[0] === undefined) {
        window.alert("invalid email");
      } else if (credentials.password !== user[0].password) {
        window.alert("wrong password");
      } else if (
        credentials.email === user[0].email &&
        credentials.password === user[0].password
      ) {
        credentials.id = user[0].id;
        credentials.username = user[0].username;
        handleLogin();
      }
    });
  };
  return (
    <>
      <Segment className="curiositan_segment" clearing>
        <Header floated="left" as="h1" className="curiositan_header">
          <Image
            src={require("../images/curiositySelfie.png")}
            alt="Curiositan"
            style={{ height: "80", width: "150" }}
            // width="150"
            // height="80"
            className="curiositan_image"
            rounded
          />
          C U R I O S I T A N
        </Header>
      </Segment>
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

export default withRouter(Login);
