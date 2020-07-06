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
  Menu,
  Container,
} from "semantic-ui-react";
import PhotoFilterCamera from "../photos/PhotoFilterCamera";
import PhotoFilterDate from "../photos/PhotoFilterDate";

const PhotosSaved = () => {
  const putEditedPhoto = DataManager.putEditedPhoto;
  const deletePhoto = DataManager.deletePhoto;
  const getUserWithSavedPhotos = DataManager.getUserWithSavedPhotos;
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

  const user = JSON.parse(sessionStorage.credentials);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleDeleteOpen = () => setDeleteModalState(true);
  const handleDeleteClose = () => setDeleteModalState(false);
  useEffect(() => {
    getUserWithSavedPhotos(user.id).then((result) =>
      setSavedPhotos(result.photos)
    );
  }, [modalOpen]);
  useEffect(() => {
    getUserWithSavedPhotos(user.id).then((result) =>
      setSavedPhotos(result.photos)
    );
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
    stateToChange.userId = user.id;
    stateToChange.url = obj.url;
    stateToChange.id = obj.id;
    setEditedPhoto(stateToChange);
    putEditedPhoto(stateToChange);
  };

  const editModal = (obj) => (
    <>
      <Modal
        trigger={<Icon id={obj.id} name="edit outline" onClick={handleOpen} />}
        onClose={handleClose}
        closeIcon
      >
        <Header>{user.username} -- change how you remember this.</Header>
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
                animated="fade"
                onClick={() => {
                  editedCommentPhoto(obj);
                  getUserWithSavedPhotos(user.id);
                  handleClose();
                }}
                style={{ marginBottom: 10 }}
              >
                <Button.Content visible>
                  <Icon name="save outline" /> Save Comment
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="save" /> Saved!
                </Button.Content>
              </Button>
            }
          </Form>
        </Modal.Actions>
      </Modal>
    </>
  );

  const deleteModal = (obj) => (
    <Modal
      closeIcon
      trigger={
        <Icon
          style={{ marginLeft: 10 }}
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
          animated="fade"
          id="delete"
          onClick={() => {
            deletePhoto(obj.id);
            handleDeleteClose();
          }}
        >
          <Button.Content visible>
            <Icon name="trash alternate outline" />
            Delete
          </Button.Content>
          <Button.Content hidden>
            <Icon name="trash" />
            Deleted!
          </Button.Content>
        </Button>
        {/* <Button id="keep" onClick={() => handleDeleteClose()}>
          <Icon name="archive" />
          Keep
        </Button> */}
      </Modal.Actions>
    </Modal>
  );

  const [activeTab, setActiveTab] = useState({ name: "Saved Photos" });

  const changeTab = (event) => {
    event.persist();
    const stateToChange = { ...activeTab };
    stateToChange.name = event.target.innerText;
    setActiveTab(stateToChange);
  };

  return (
    <>
      <Container style={{ background: "#957e6e", borderRadius: 10 }}>
        <Header
          textAlign="center"
          content={`SAVED PHOTOS`}
          style={{ padding: 25, color: "#DDBEA6" }}
        />
        <Container>
          <Menu attached="top" tabular>
            <Menu.Item
              active={activeTab.name === "Saved Photos"}
              name="Saved Photos"
              onClick={(evt) => {
                changeTab(evt);
                getUserWithSavedPhotos(user.id).then((result) =>
                  setSavedPhotos(result.photos)
                );
              }}
            />
            <Menu.Item
              name="Filter By Camera"
              active={activeTab.name === "Filter By Camera"}
              onClick={(evt) => {
                setSavedPhotos([]);
                changeTab(evt);
                return <PhotoFilterCamera />;
              }}
            />
            <Menu.Item
              name="Sort By Date"
              active={activeTab.name === "Sort By Date"}
              onClick={(evt) => {
                setSavedPhotos([]);
                changeTab(evt);
              }}
            />
          </Menu>
          <Grid centered attached="bottom" columns={2} verticalAlign="middle">
            <Grid.Row centered columns={4}>
              {activeTab.name === "Saved Photos"
                ? savedPhotos.reverse().map((photo) => (
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
                        >
                          {deleteModal(photo)}
                        </Card.Description>
                        <Card.Content style={{ background: "#fc684a" }}>
                          <Image
                            rounded
                            size="small"
                            floated="right"
                            src={photo.url}
                          />
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
                  ))
                : null}
              {activeTab.name === "Filter By Camera" ? (
                <PhotoFilterCamera
                  editModal={editModal}
                  deleteModal={deleteModal}
                />
              ) : null}
              {activeTab.name === "Sort By Date" ? (
                <PhotoFilterDate
                  getUserWithSavedPhotos={getUserWithSavedPhotos}
                  editModal={editModal}
                  deleteModal={deleteModal}
                />
              ) : null}
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default withRouter(PhotosSaved);
