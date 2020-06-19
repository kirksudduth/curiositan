import React from "react";
import { Image, Card } from "semantic-ui-react";

const PhotoCard = (props) => {
  const date = props.date;
  const camera = props.camera;
  return (
    <>
      <Card className="photoCard">
        <Card.Content>
          <Image
            src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02590/opgs/edr/fcam/FRB_627421745EDR_F0772254FHAZ00302M_.JPG"
            size="small"
            rounded
            floated="right"
          />
          <Card.Header></Card.Header>
        </Card.Content>
      </Card>
    </>
  );
};

export default PhotoCard;
