import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import DataManager from "../../modules/DataManager";
import PhotoSearchForm from "../photos/PhotoSearchForm";

const PhotoSearchList = (props) => {
  const [date, setDate] = useState({ date: "" });
  const [camValue, setCamValue] = useState({ value: "" });

  const handleDateFieldChange = (evt) => {
    evt.persist();
    const stateToChange = { ...date };
    stateToChange.date = evt.target.value;
    setDate(stateToChange);
  };
  const handleRadioChange = (evt) => {
    evt.persist();
    const stateToChange = { ...camValue };
    stateToChange.value = evt.target.innerText;
    setCamValue(stateToChange);
  };

  return (
    <>
      <Grid celled>
        <Grid.Row>
          <PhotoSearchForm
            handleRadioChange={handleRadioChange}
            handleDateFieldChange={handleDateFieldChange}
            date={date}
            camera={camValue}
          />
        </Grid.Row>
      </Grid>
    </>
  );
};

export default PhotoSearchList;
