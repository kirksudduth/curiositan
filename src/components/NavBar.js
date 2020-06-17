import React, { useState, useEffect } from "react";
import { Menu, Header, Button, Icon, Container } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

const NavBar = (props) => {
  const clearUser = props.clearUser;
  console.log(props);
  const [activeItem, setActiveItem] = useState({ activeItem: "search" });
  const handleClickEvent = (evt) => {
    debugger;
    evt.persist();
    console.log(evt.target.classList[0]);
    const stateToChange = { ...activeItem };
    stateToChange[activeItem] = evt.target.classList[0];
    setActiveItem(stateToChange);
    console.log(activeItem);
  };

  return (
    <>
      <Header
        content="Red Planet: A Curiosity"
        block
        textAlign="center"
        as="h1"
      />
      <Menu pointing secondary icon="labeled">
        <Menu.Item
          className="search"
          name="search"
          active={activeItem === "search"}
          onClick={handleClickEvent}
        >
          <Icon name="search" />
          Photo Search
        </Menu.Item>
        <Menu.Item
          name="image"
          className="image"
          active={activeItem.activeItem === "image"}
          onClick={handleClickEvent}
        >
          <Icon name="image outline" />
          Saved Photos
        </Menu.Item>
        <Menu.Item
          name="users"
          className="users"
          active={activeItem.activeItem === "users"}
          onClick={handleClickEvent}
        >
          <Icon name="users" />
          Curiositans
        </Menu.Item>
        <Menu.Item
          name="envelope"
          className="envelope"
          active={activeItem.activeItem === "envelope"}
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
