import React from "react";
import { Image, Container } from "semantic-ui-react";

const PhotoCard = () => {
  return (
    <>
      <Container className="photoCard">
        <Image
          src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02590/opgs/edr/fcam/FRB_627421745EDR_F0772254FHAZ00302M_.JPG"
          size="small"
          rounded
        />
      </Container>
    </>
  );
};

export default PhotoCard;
