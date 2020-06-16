import React, { useState } from "react";
import {
  Header,
  Grid,
  Segment,
  Form,
  Checkbox,
  Button,
} from "semantic-ui-react";
import DataManager from "../modules/DataManager";

const NewUser = (props) => {
  console.log(props);
  const setUser = props.setUser;
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (evt) => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleNewUserFieldChange = (evt) => {
    const stateToChange = { ...newUser };
    const otherStateToChange = { ...credentials };
    otherStateToChange[evt.target.id] = evt.target.value;
    stateToChange[evt.target.id] = evt.target.value;
    setNewUser(stateToChange);
    setCredentials(otherStateToChange);
  };

  const handleNewUserLogin = () => {
    console.log("newUser", newUser);
    console.log("credentials", credentials);
    setNewUser();
    DataManager.addNewUser(newUser);
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
          <Header content="New User Form" as="h2" textAlign="center" />
          <Segment>
            <Form
              onSubmit={handleNewUserLogin}
              size="large"
              className="loginForm"
            >
              <Form.Input
                type="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                id="username"
                onChange={handleNewUserFieldChange}
              />
              <Form.Input
                type="email"
                icon="at"
                iconPosition="left"
                placeholder="Email"
                id="email"
                onChange={handleNewUserFieldChange}
              />
              <Form.Input
                type="email"
                icon="at"
                iconPosition="left"
                placeholder="Confirm Email"
                id="confirmEmail"
              />
              <Form.Input
                placeholder="Password"
                icon="lock"
                iconPosition="left"
                type="password"
                id="password"
                onChange={handleNewUserFieldChange}
              />
              <Form.Input
                placeholder="Confirm Password"
                icon="lock"
                iconPosition="left"
                type="password"
                id="confirmPassword"
              />
              <Form.Field>
                <Checkbox label="Remember me" />
              </Form.Field>
              <Button fluid color="blue" size="medium" type="submit">
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default NewUser;
