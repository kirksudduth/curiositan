import React, { useState } from "react";
import {
  Header,
  Grid,
  Segment,
  Form,
  Checkbox,
  Button,
  Image,
} from "semantic-ui-react";
import DataManager from "../modules/DataManager";
import { withRouter } from "react-router-dom";

const NewUser = (props) => {
  const [credentials, setCredentials] = useState({});
  const setUser = props.setUser;

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleNewUserFieldChange = (evt) => {
    const stateToChange = { ...newUser };
    stateToChange[evt.target.id] = evt.target.value;
    setNewUser(stateToChange);
  };

  const handleNewUserLogin = () => {
    DataManager.addNewUser(newUser);
    DataManager.getUserByEmail(newUser.email).then((user) => {
      const stateToChange = { ...credentials };
      stateToChange.id = user[0].id;
      stateToChange.username = user[0].username;
      setCredentials(stateToChange.id);
      setUser(stateToChange);
      props.history.push("/photos_search");
    });
  };

  return (
    <>
      <Segment style={{ background: "#DDBEA6" }} clearing>
        <Header floated="left" as="h1" style={{ color: "white" }}>
          <Image
            src={require("../images/curiositySelfie.png")}
            alt="Curiositan"
            style={{ width: 150, height: 80 }}
            rounded
            // circular
          />
          C U R I O S I T A N
        </Header>
      </Segment>
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
                onChange={handleNewUserFieldChange}
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
                onChange={handleNewUserFieldChange}
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

export default withRouter(NewUser);
