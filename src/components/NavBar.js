import React, { useState } from "react";
import { Menu, Header, Icon, Segment } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

const NavBar = (props) => {
  const clearUser = props.clearUser;
  const [activeItem, setActiveItem] = useState({ name: "search" });

  const handleClickEvent = (evt) => {
    evt.persist();
    const stateToChange = { ...activeItem };
    stateToChange.name = evt.target.classList[0];
    setActiveItem(stateToChange);
    if (activeItem.name === "search") {
      props.history.push("/photos_search");
    } else if (activeItem.name === "image") {
      props.history.push("/saved_photos");
    } else if (activeItem.name === "users") {
      props.history.push("/curiositans");
    } else if (activeItem.name === "envelope") {
      props.history.push("/messages");
    }
  };

  return (
    <>
      <Header
        content="Red Planet: A Curiosity"
        block
        textAlign="center"
        as="h1"
      />
      <Menu tabular attached="top" icon="labeled">
        <NavLink to="/photos_search">
          <Menu.Item
            className="search"
            name="search"
            active={activeItem.name === "search"}
            //   onClick={handleClickEvent}
          >
            <Icon name="search" onClick={handleClickEvent} />
            Photo Search
          </Menu.Item>
        </NavLink>
        <NavLink to="/saved_photos">
          <Menu.Item
            name="image"
            className="image"
            active={activeItem.name === "image"}
            //   onClick={handleClickEvent}
          >
            <Icon name="image outline" onClick={handleClickEvent} />
            Saved Photos
          </Menu.Item>
        </NavLink>
        <NavLink to="/curiositans">
          <Menu.Item
            name="users"
            className="users"
            active={activeItem.name === "users"}
            //   onClick={handleClickEvent}
          >
            <Icon name="users" onClick={handleClickEvent} />
            Curiositans
          </Menu.Item>
        </NavLink>
        <NavLink to="/messages">
          <Menu.Item
            name="envelope"
            className="envelope"
            active={activeItem.name === "envelope"}
            //   onClick={handleClickEvent}
          >
            <Icon name="envelope outline" onClick={handleClickEvent} />
            Messages
          </Menu.Item>
        </NavLink>
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
