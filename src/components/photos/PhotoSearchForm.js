import React, { useState, useEffect } from "react";
import {
  Message,
  Header,
  Form,
  Segment,
  Grid,
  Button,
} from "semantic-ui-react";
import DataManager from "../../modules/DataManager";

const PhotoSearchForm = (props) => {
  const [date, setDate] = useState({ date: "2012-08-06" });
  const [cameras, setCameras] = useState([]);

  const handleFieldChange = (evt) => {
    evt.persist();
    const stateToChange = { ...date };
    stateToChange.date = evt.target.value;
    setDate(stateToChange);
    // console.log(stateToChange);
  };
  const getCameras = (date) => {
    DataManager.getManifest(date).then((obj) => {
      const camerasArray = obj.cameras;
      setCameras(camerasArray);
    });
  };
  useEffect(() => {
    getCameras(date);
  }, [date]);
  console.log("Cameras: ", cameras);
  console.log("date: ", date);
  //   const getManifest = () => {
  //     DataManager.getManifest().then((obj) =>
  //       console.log(obj.photo_manifest.photos[3])
  //     );
  //   };
  return (
    <>
      <Grid columns={2} centered>
        <Grid.Column>
          <Header
            content="Search Curiosity's Photos by Date and Camera Type"
            as="h3"
          />
          <Segment>
            <Form>
              <Form.Field
                label="Date:"
                control="input"
                id="date"
                type="date"
                min="2012-08-06"
                onChange={handleFieldChange}
              />
              {/* <Button size="tiny" onClick={handleFieldChange} value="date">
                Get Cameras
              </Button> */}
              <Form.Group grouped>
                <label>Camera Type:</label>
                {/* {getManifest(date)} */}
              </Form.Group>
              <Button type="submit" fluid>
                Search
              </Button>
              {/* <Form.Field
                label="Camera Type:"
                control="select"
                options={"yes"}
              ></Form.Field> */}
            </Form>
          </Segment>
          <Message>
            Want to see the latest photos Curiosity has taken?{" "}
            <a href="/latest_photos">Click Here!</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default PhotoSearchForm;
