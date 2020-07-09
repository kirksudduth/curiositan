import React, { useState, useEffect } from "react";
import { Grid, Card, Image } from "semantic-ui-react";

const PhotoFilterDate = (props) => {
  const getUserWithSavedPhotos = props.getUserWithSavedPhotos;
  const editModal = props.editModal;
  const deleteModal = props.deleteModal;
  const [dateFilterPics, setDateFilterPics] = useState([]);
  const user = JSON.parse(sessionStorage.credentials);

  useEffect(() => {
    getUserWithSavedPhotos(user.id).then((result) => {
      const photoArray = result.photos;
      photoArray.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      setDateFilterPics(photoArray);
    });
  }, []);

  return (
    <>
      {dateFilterPics.map((photo) => (
        <Grid.Column key={photo.id}>
          <Card
            fluid
            style={{
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 5,
              marginRight: 5,
              padding: 2,
            }}
            raised
            key={photo.id}
          >
            <Card.Description
              style={{
                background: "#DDBEA6",
              }}
              floated="right"
            >
              {deleteModal(photo)}
            </Card.Description>
            <Card.Content style={{ background: "#fc684a" }}>
              <Image rounded size="small" floated="right" src={photo.url} />
              <Card.Meta>
                <h4>{photo.camera}</h4>
              </Card.Meta>
              <Card.Meta>
                <h4>{photo.date}</h4>
              </Card.Meta>
              <Card.Content>Comment: {photo.comment} </Card.Content>
            </Card.Content>
            <Card.Content
              style={{
                background: "#DDBEA6",
              }}
              extra
            >
              {editModal(photo)}
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </>
  );
};

export default PhotoFilterDate;
