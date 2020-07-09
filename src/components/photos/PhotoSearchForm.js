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
  Modal,
  Input,
  Popup,
  Container,
} from "semantic-ui-react";
import DataManager from "../../modules/DataManager";

const PhotoSearchForm = (props) => {
  const getLatestPhotos = DataManager.getLatestPhotos;
  const handleRadioChange = props.handleRadioChange;
  const handleDateFieldChange = props.handleDateFieldChange;
  const date = props.date;
  const camValue = props.camera;

  const [roverPhotos, setRoverPhotos] = useState([]);
  const getRoverPhotos = (date, camera) => {
    setLatestPhotos([]);
    DataManager.getRoverPhotos(date, camera).then((results) =>
      setRoverPhotos(results.photos)
    );
  };
  const [cameras, setCameras] = useState([]);
  const [savedPhoto, setSavedPhoto] = useState({
    userId: "",
    comment: "",
    date: "",
    camera: "",
    url: "",
  });
  const [latestPhotos, setLatestPhotos] = useState([]);
  const user = JSON.parse(sessionStorage.credentials);

  const makePhotoWithComment = (obj) => {
    const stateToChange = { ...savedPhoto };
    stateToChange.date = obj.earth_date;
    stateToChange.camera = obj.camera.name;
    stateToChange.userId = user.id;
    stateToChange.url = obj.img_src;
    setSavedPhoto(stateToChange);
    DataManager.postSavedPhoto(stateToChange);
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...savedPhoto };
    evt.persist();
    stateToChange.comment = evt.target.value;
    setSavedPhoto(stateToChange);
  };

  // *****  MODAL FOR SAVE PHOTO FUNCTION  *****
  const modalsRule = (obj) => (
    <Modal trigger={<Icon name="eye" />} closeIcon>
      <Header content="More Pixels for Viewing" />
      <Modal.Content>
        <Image size="huge" src={obj.img_src} />
      </Modal.Content>
      <Modal.Actions>
        <Form type="submit">
          <Input
            label="Comment: "
            id="comment"
            fluid
            onChange={handleFieldChange}
            type="text area"
            style={{ marginBottom: 10 }}
          />
          <Button
            animated="fade"
            onClick={() => makePhotoWithComment(obj)}
            style={{ marginBottom: 10 }}
          >
            <Button.Content visible>
              <Icon name="save outline" /> Save Photo
            </Button.Content>
            <Button.Content hidden>
              <Icon name="save" /> Saved!
            </Button.Content>
          </Button>
        </Form>
      </Modal.Actions>
    </Modal>
  );

  const getCameras = (date) => {
    DataManager.getManifest(date).then((obj) => {
      if (obj === undefined) {
        window.alert("Try a different date!");
      } else {
        const camerasArray = obj.cameras;
        setCameras(camerasArray);
      }
    });
  };

  const camerasPopupContent = (camera) => {
    if (camera === "FHAZ") {
      return "Front Hazard Avoidance Camera -- helps Curiosity avoid Martian obstacles in front.";
    } else if (camera === "RHAZ") {
      return "Rear Hazard Avoidance Camera -- helps Curiosity keep an eye on those haters trying to creep.";
    } else if (camera === "MAST") {
      return "Mast Cameras -- take true-color images. Feel like some of the better pics are taken by these cameras.";
    } else if (camera === "NAVCAM") {
      return "Navigation Cameras -- black and white cameras help Curiosity plan its next moves and scope out terrain.";
    } else if (camera === "MAHLI") {
      return "Mars Hand Lens Imager -- takes microscopic pictures of Mars stuff, yo!";
    } else if (camera === "CHEMCAM") {
      return "Chemistry and Camera Complex -- a microscope takes pictures of Martian terrain after its laser hand blasts it.";
    } else if (camera === "MARDI") {
      return "Mars Descent Imager -- mainly used for Curiosity's descent to Mars. Took hella pics.";
    }
  };

  const clearPhotosAndGetLatest = () => {
    setRoverPhotos([]);
    getLatestPhotos().then((obj) => setLatestPhotos(obj.latest_photos));
  };

  return (
    <>
      {/* <Grid
        verticalAlign="middle"
        style={{
          background: "#957e6e",
        }}
      > */}
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
            <Grid.Row>
              {cameras.map((camera) => (
                <Grid.Column key={camera} width={2}>
                  <Popup
                    key={camera}
                    content={camerasPopupContent(camera)}
                    trigger={
                      <Form.Radio
                        key={camera}
                        label={camera}
                        value={camera}
                        checked={camValue.value === `${camera}`}
                        onChange={handleRadioChange}
                      />
                    }
                    position="top left"
                    basic
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
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
        <Message style={{ align: "center" }}>
          Want to see the latest photos Curiosity has taken?{" "}
          <Button
            fluid
            animated="fade"
            onClick={() => clearPhotosAndGetLatest()}
          >
            <Button.Content visible>Click Here!</Button.Content>
            <Button.Content hidden>Latest Mars pics!</Button.Content>
          </Button>
        </Message>
      </Grid.Column>
      {/* <Grid.Row > */}
      {roverPhotos.map((photo) => (
        <Grid.Column key={photo.id} width={4}>
          <Card
            fluid
            style={{ marginBottom: 10, marginTop: 10 }}
            raised
            key={photo.id}
          >
            <Card.Content style={{ background: "#DDBEA6" }}>
              <Image rounded size="tiny" floated="right" src={photo.img_src} />
              <Card.Meta>
                <h4>Camera:</h4> {photo.camera.full_name}
              </Card.Meta>
              <Card.Meta>
                <h4>Date:</h4> {photo.earth_date}
              </Card.Meta>
            </Card.Content>
            <Card.Content style={{ background: "#fc684a" }} extra>
              {modalsRule(photo)} {`<=== View -or- View and Save`}
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
      {latestPhotos.map((photo) => (
        <Grid.Column key={photo.id} width={4}>
          <Card fluid style={{ marginBottom: 10 }} raised key={photo.id}>
            <Card.Content style={{ background: "#DDBEA6" }}>
              <Image rounded size="tiny" floated="right" src={photo.img_src} />
              <Card.Meta>
                <h4>Camera:</h4> {photo.camera.full_name}
              </Card.Meta>
              <Card.Meta>
                <h4>Date:</h4> {photo.earth_date}
              </Card.Meta>
            </Card.Content>
            <Card.Content style={{ background: "#fc684a" }} extra>
              {modalsRule(photo)}
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
      {/* </Grid.Row> */}
      {/* </Grid> */}
    </>
  );
};

export default PhotoSearchForm;
