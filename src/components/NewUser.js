import React, { useState } from "react";
import {
  Header,
  Grid,
  Segment,
  Form,
  Checkbox,
  Button,
} from "semantic-ui-react";

const NewUser = (props) => {
  const handleNewUserFieldChange = props.handleNewUserFieldChange;
  const handleNewUserLogin = props.handleNewUserLogin;

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
