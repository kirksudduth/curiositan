import React, { useEffect, useState } from "react";
import DataManager from "../../modules/DataManager";
import { Header, Grid, Card, Image } from "semantic-ui-react";

const PhotosSaved = () => {
  const getSavedPhotos = DataManager.getSavedPhotos;
  const [savedPhotos, setSavedPhotos] = useState([]);
  const userId = 1;
  useEffect(() => {
    getSavedPhotos(userId).then((result) => setSavedPhotos(result.photos));
  }, []);

  return (
    <>
      <Header content="Saved Photos" />
      <Grid.Row>
        {savedPhotos.map((photo) => (
          <Grid.Column key={photo.id} width={4}>
            <Card style={{ marginBottom: 5 }} raised key={photo.id}>
              <Card.Content>
                <Image size="tiny" floated="right" src={photo.url} />
                <Card.Meta>Camera: {photo.camera}</Card.Meta>
                <Card.Meta>Date: {photo.date}</Card.Meta>
                <Card.Meta>Comment: {photo.comment} </Card.Meta>
              </Card.Content>
              <Card.Content extra></Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </>
  );
};

export default PhotosSaved;
