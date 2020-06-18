import React from "react";
import {
  Message,
  Header,
  Form,
  Segment,
  Grid,
  Button,
} from "semantic-ui-react";

const PhotoSearchForm = (props) => {
  console.log(props);
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
                type="date"
                min="2012-08-06"
                // onChange={handleFieldChange}
              />
              <Form.Group grouped>
                <label>Camera Type:</label>
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
