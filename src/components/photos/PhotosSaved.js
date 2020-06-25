import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
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
  const putEditedPhoto = DataManager.putEditedPhoto;
  const deletePhoto = DataManager.deletePhoto;
  const getSavedPhotos = DataManager.getSavedPhotos;
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState({
    comment: "",
    url: "",
    userId: "",
    camera: "",
    date: "",
    id: "",
  });

  const userId = JSON.parse(sessionStorage.credentials);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleDeleteOpen = () => setDeleteModalState(true);
  const handleDeleteClose = () => setDeleteModalState(false);
  useEffect(() => {
    getSavedPhotos(userId).then((result) => setSavedPhotos(result.photos));
  }, [modalOpen]);
  useEffect(() => {
    getSavedPhotos(userId).then((result) => setSavedPhotos(result.photos));
  }, [deleteModalState]);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...editedPhoto };
    stateToChange.comment = evt.target.value;
    setEditedPhoto(stateToChange);
  };

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

  const editModal = (obj) => (
    <>
      <Modal
        trigger={<Icon id={obj.id} name="edit outline" onClick={handleOpen} />}
        // open={modalOpen}
        onClose={handleClose}
      >
        <Header content="Change how you remember this." />
        <Modal.Content>
          <Image size="huge" src={obj.url} />
        </Modal.Content>
        <Modal.Actions>
          <Form>
            <Input
              label="Edit Comment: "
              id="comment"
              fluid
              onChange={handleFieldChange}
              defaultValue={obj.comment}
              type="text area"
              style={{ marginBottom: 10 }}
            />
            {
              <Button
                icon="save outline"
                onClick={() => {
                  editedCommentPhoto(obj);
                  getSavedPhotos(userId);
                  handleClose();
                }}
                content="Save Photo"
                style={{ marginBottom: 10 }}
              />
            }
          </Form>
        </Modal.Actions>
      </Modal>
      {/* <Icon id={obj.id} onClick={() => handleOpen} name="edit outline" /> */}
    </>
  );

  const deleteModal = (obj) => (
    <Modal
      trigger={
        <Icon
          name="trash alternate outline"
          onClick={handleDeleteOpen}
          size="small"
        />
      }
    >
      <Header icon="trash alternate outline" content="Delete Photo?" />
      <Modal.Content>
        <p>Sure, you want to delete the photo?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          id="delete"
          onClick={() => {
            deletePhoto(obj.id);
            handleDeleteClose();
          }}
        >
          <Icon name="trash alternate outline" />
          Delete
        </Button>
        <Button id="keep" onClick={() => handleDeleteClose()}>
          <Icon name="archive" />
          Keep
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <>
      <Header textAlign="center" content="Saved Photos" />
      <Grid centered width={2}>
        <Grid.Row>
          {savedPhotos.map((photo) => (
            <Grid.Column key={photo.id} width={8}>
              <Card style={{ marginBottom: 5 }} raised key={photo.id}>
                <Card.Description floated="right">
                  {deleteModal(photo)}
                </Card.Description>
                <Card.Content>
                  <Image size="small" floated="right" src={photo.url} />
                  <Card.Meta>
                    <h4>{photo.camera}</h4>
                  </Card.Meta>
                  <Card.Meta>
                    <h4>{photo.date}</h4>
                  </Card.Meta>
                  <Card.Content>Comment: {photo.comment} </Card.Content>
                </Card.Content>
                <Card.Content extra>{editModal(photo)}</Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default withRouter(PhotosSaved);
