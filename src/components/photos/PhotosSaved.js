import React, { useEffect, useState } from "react";
import DataManager from "../../modules/DataManager";
import {
  Header,
  Grid,
  Card,
  Image,
  Modal,
  Icon,
  Input,
  Form,
  Button,
} from "semantic-ui-react";

const PhotosSaved = () => {
  const getSavedPhotos = DataManager.getSavedPhotos;
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [editedPhoto, setEditedPhoto] = useState({
    comment: "",
    url: "",
    userId: "",
    camera: "",
    date: "",
    id: "",
  });
  const userId = JSON.parse(sessionStorage.credentials);
  const putEditedPhoto = DataManager.putEditedPhoto;

  const handleFieldChange = (evt) => {
    const stateToChange = { ...editedPhoto };
    stateToChange.comment = evt.target.value;
    setEditedPhoto(stateToChange);
    console.log(stateToChange.comment);
  };
  useEffect(() => {
    getSavedPhotos(userId).then((result) => setSavedPhotos(result.photos));
  }, []);

  const editModal = (obj) => (
    <Modal trigger={<Icon name="edit outline" />}>
      <Header content="Change how you remember this." />
      <Modal.Content>
        <Image size="large" src={obj.url} />
      </Modal.Content>
      <Modal.Actions>
        <Form>
          <Input
            label="Edit Comment: "
            id="comment"
            fluid
            onChange={handleFieldChange}
            placeholder={obj.comment}
            type="text area"
            style={{ marginBottom: 10 }}
          />
          <Button
            icon="save outline"
            onClick={() => editedCommentPhoto(obj)}
            content="Save Photo"
          />
        </Form>
      </Modal.Actions>
    </Modal>
  );

  const deleteModal = (obj) => (
    <Modal trigger={<Icon name="trash alternate outline" basic size="small" />}>
      <Header icon="trash alternate outline" content="Delete Photo?" />
      <Modal.Content>
        <p>Sure, you want to delete the photo?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button id="delete">
          <Icon name="trash alternate outline" />
          Delete
        </Button>
        <Button id="keep">
          <Icon name="archive" />
          Keep
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const editedCommentPhoto = (obj) => {
    const stateToChange = { ...editedPhoto };
    stateToChange.date = obj.date;
    stateToChange.camera = obj.camera;
    stateToChange.userId = userId;
    stateToChange.url = obj.url;
    stateToChange.id = obj.id;
    setEditedPhoto(stateToChange);
    putEditedPhoto(stateToChange);
  };

  return (
    <>
      <Header content="Saved Photos" />
      <Grid.Row>
        {savedPhotos.map((photo) => (
          <Grid.Column key={photo.id} width={4}>
            <Card style={{ marginBottom: 5 }} raised key={photo.id}>
              <Card.Description floated="right">
                {deleteModal(photo)}
              </Card.Description>
              <Card.Content>
                <Image size="tiny" floated="right" src={photo.url} />
                <Card.Meta>Camera: {photo.camera}</Card.Meta>
                <Card.Meta>Date: {photo.date}</Card.Meta>
                <Card.Meta>Comment: {photo.comment} </Card.Meta>
              </Card.Content>
              <Card.Content extra>{editModal(photo, editedPhoto)}</Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </>
  );
};

export default PhotosSaved;
