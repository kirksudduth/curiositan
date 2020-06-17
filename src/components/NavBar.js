import React, { useState, useEffect } from "react";
import { Menu, Header, Button, Icon, Container } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

const NavBar = (props) => {
  const clearUser = props.clearUser;
  const [activeItem, setActiveItem] = useState({ name: "image" });

  const handleClickEvent = (evt) => {
    evt.persist();
    const stateToChange = { ...activeItem };
    stateToChange.name = evt.target.classList[0];
    setActiveItem(stateToChange);
  };

  return (
    <>
      <Header
        content="Red Planet: A Curiosity"
        block
        textAlign="center"
        as="h1"
      />
      <Menu secondary pointing icon="labeled">
        <Menu.Item
          className="search"
          name="search"
          active={activeItem.name === "search"}
          onClick={handleClickEvent}
        >
          <Icon name="search" onClick={handleClickEvent} />
          Photo Search
        </Menu.Item>
        <Menu.Item
          name="image"
          className="image"
          active={activeItem.name === "image"}
          onClick={handleClickEvent}
        >
          <Icon name="image outline" />
          Saved Photos
        </Menu.Item>
        <Menu.Item
          name="users"
          className="users"
          active={activeItem.name === "users"}
          onClick={handleClickEvent}
        >
          <Icon name="users" />
          Curiositans
        </Menu.Item>
        <Menu.Item
          name="envelope"
          className="envelope"
          active={activeItem.name === "envelope"}
          onClick={handleClickEvent}
        >
          <Icon name="envelope outline" />
          Messages
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={clearUser}>
            <Icon name="sign-out" />
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default NavBar;
