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
  const [date, setDate] = useState({ date: "" });
  const [cameras, setCameras] = useState([]);
  const [camValue, setCamValue] = useState({ value: "" });

  const handleFieldChange = (evt) => {
    evt.persist();
    const stateToChange = { ...date };
    stateToChange.date = evt.target.value;
    setDate(stateToChange);
  };

  const getCameras = (date) => {
    DataManager.getManifest(date).then((obj) => {
      const camerasArray = obj.cameras;
      setCameras(camerasArray);
    });
  };

  const handleRadioChange = (evt) => {
    evt.persist();
    const stateToChange = { ...camValue };
    stateToChange.value = evt.target.innerText;
    setCamValue(stateToChange);
    console.log(stateToChange);
  };
  console.log(camValue);
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
              <Button size="tiny" onClick={() => getCameras(date)} value="date">
                Get Cameras
              </Button>
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
