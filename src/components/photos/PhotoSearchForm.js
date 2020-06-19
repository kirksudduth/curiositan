import React, { useState } from "react";
import {
  Message,
  Header,
  Form,
  Grid,
  Button,
  Card,
  Image,
  Icon,
} from "semantic-ui-react";
import DataManager from "../../modules/DataManager";

const PhotoSearchForm = (props) => {
  const roverPhotos = props.roverPhotos.photos;
  const getRoverPhotos = props.getRoverPhotos;
  const handleRadioChange = props.handleRadioChange;
  const handleDateFieldChange = props.handleDateFieldChange;
  const date = props.date;
  const camValue = props.camera;
  const [cameras, setCameras] = useState([]);
  console.log(roverPhotos);

  const getCameras = (date) => {
    DataManager.getManifest(date).then((obj) => {
      const camerasArray = obj.cameras;
      setCameras(camerasArray);
    });
  };

  return (
    <>
      <Grid verticalAlign="middle" horizontalAlign="middle">
        <Grid.Column width={4}>
          <Header
            textAlign="center"
            content="Search Curiosity's Photos by Date and Camera Type"
            as="h5"
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Form size="tiny">
            <Form.Group grouped widths="equal">
              <Form.Field
                label="Date:"
                control="input"
                id="date"
                type="date"
                min="2012-08-06"
                onChange={handleDateFieldChange}
              />
              <Form.Field>
                <Button
                  fluid
                  size="tiny"
                  onClick={() => {
                    if (date.date === "") {
                      window.alert("Please enter date.");
                    } else {
                      getCameras(date);
                    }
                  }}
                  value="date"
                >
                  Get Cameras
                </Button>
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <label>Camera Type:</label>
              {cameras.map((camera) => (
                <Form.Radio
                  key={camera}
                  label={camera}
                  value={camera}
                  checked={camValue.value === `${camera}`}
                  onChange={handleRadioChange}
                />
              ))}
            </Form.Group>
            <Button
              size="tiny"
              onClick={() => {
                if (date.date === "" || camValue.value === "") {
                  window.alert("Please enter date and camera");
                } else {
                  getRoverPhotos(date.date, camValue.value);
                }
              }}
              fluid
            >
              Get Photos
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={4}>
          <Message>
            Want to see the latest photos Curiosity has taken?{" "}
            <a href="/latest_photos">Click Here!</a>
          </Message>
        </Grid.Column>
        <Grid.Row>
          {!roverPhotos
            ? []
            : roverPhotos.map((photo) => (
                <Grid.Column width={4}>
                  <Card key={photo.id}>
                    <Card.Content>
                      <Image size="small" src={photo.img_src} />
                    </Card.Content>
                    <Card.Content extra>
                      <Icon floated="right" />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default PhotoSearchForm;
