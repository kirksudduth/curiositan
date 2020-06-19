import React, { useState } from "react";
import { Route } from "react-router-dom";
import PhotoSearchList from "../photos/PhotoSearchList";
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
  const handleRadioChange = props.handleRadioChange;
  const handleDateFieldChange = props.handleDateFieldChange;
  const date = props.date;
  const camValue = props.camera;
  //   const [date, setDate] = useState({ date: "" });
  const [cameras, setCameras] = useState([]);
  console.log(props);
  //   const [camValue, setCamValue] = useState({ value: "" });

  //   const handleDateFieldChange = (evt) => {
  //     evt.persist();
  //     const stateToChange = { ...date };
  //     stateToChange.date = evt.target.value;
  //     setDate(stateToChange);
  //   };

  const getCameras = (date) => {
    DataManager.getManifest(date).then((obj) => {
      const camerasArray = obj.cameras;
      setCameras(camerasArray);
    });
  };

  //   const handleRadioChange = (evt) => {
  //     evt.persist();
  //     const stateToChange = { ...camValue };
  //     stateToChange.value = evt.target.innerText;
  //     setCamValue(stateToChange);
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
                onChange={handleDateFieldChange}
              />
              <Form.Field>
                <Button
                  size="tiny"
                  onClick={() => getCameras(date)}
                  value="date"
                >
                  Get Cameras
                </Button>
              </Form.Field>
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
                onClick={() => props.history.push("/photos_search_list")}
                fluid
              >
                Search
              </Button>
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
