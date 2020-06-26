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
  Segment,
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
                animated="fade"
                onClick={() => {
                  editedCommentPhoto(obj);
                  getSavedPhotos(userId);
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
      <Header
        textAlign="center"
        content={`:_*:*:||:S A V E D_'-'__'-'_P H O T O S:||:*:*_:`}
      />
      <Menu attached="top" tabular>
        <Menu.Item
          active={activeTab.name === "Saved Photos"}
          name="Saved Photos"
          onClick={(evt) => {
            changeTab(evt);
            getSavedPhotos(userId).then((result) =>
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
          }}
        />
        <Menu.Item
          name="Filter By Date"
          active={activeTab.name === "Filter By Date"}
          onClick={(evt) => {
            setSavedPhotos([]);
            changeTab(evt);
          }}
        />
      </Menu>
      {/* <Segment attached="bottom"> */}
      <Grid centered attached="bottom" columns={2} verticalAlign="middle">
        <Grid.Row centered columns={4}>
          {savedPhotos.reverse().map((photo) => (
            <Grid.Column key={photo.id}>
              <Card
                style={{ marginBottom: 10, marginTop: 10 }}
                raised
                key={photo.id}
              >
                <Card.Description floated="right">
                  {deleteModal(photo)}
                </Card.Description>
                <Card.Content>
                  <Image rounded size="small" floated="right" src={photo.url} />
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
      {/* </Segment> */}
    </>
  );
};

export default withRouter(PhotosSaved);
