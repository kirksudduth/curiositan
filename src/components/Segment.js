import React from "react";
import { Segment, Header, Label, Icon, Image } from "semantic-ui-react";

const SegmentMod = (props) => {
  if (sessionStorage.credentials) {
    let credentials = JSON.parse(sessionStorage.credentials);
    console.log(credentials);
    return (
      <Segment className="curiositan_segment" clearing>
        <Header floated="left" as="h1" className="curiositan_header">
          <Image
            src={require("../images/curiositySelfie.png")}
            alt="Curiositan"
            className="curiositan_image"
            rounded
          />
          C U R I O S I T A N
        </Header>
        {credentials ? (
          <Header as="h1" floated="right">
            <Label as="a" color="brown" size="large">
              <Icon name="user circle" />
              {credentials.username}
            </Label>
          </Header>
        ) : null}
      </Segment>
    );
  } else {
    return (
      <Segment className="curiositan_segment" clearing>
        <Header floated="left" as="h1" className="curiositan_header">
          <Image
            src={require("../images/curiositySelfie.png")}
            alt="Curiositan"
            className="curiositan_image"
            rounded
          />
          C U R I O S I T A N
        </Header>
      </Segment>
    );
  }
};

export default SegmentMod;
