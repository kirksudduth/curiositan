import React, { useState, useRef } from "react";
import {
  Modal,
  Icon,
  Image,
  Form,
  Input,
  Header,
  Button,
} from "semantic-ui-react";
import DataManager from "../../modules/DataManager";
import "../Curiosity.css";

const PhotoEditModal = (props) => {
  const photo = props.photo;
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
  const getSavedPhotos = DataManager.getSavedPhotos;

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

  const handleFieldChange = (evt) => {
    const stateToChange = { ...editedPhoto };
    stateToChange.comment = evt.target.value;
    setEditedPhoto(stateToChange);
  };
  return (
    <>
      <Modal>
        <Header content="Change how you remember this." />
        <Modal.Content>
          <Image size="large" src={photo.url} />
        </Modal.Content>
        <Modal.Actions>
          <Form>
            <Input
              label="Edit Comment: "
              id="comment"
              fluid
              onChange={handleFieldChange}
              defaultValue={photo.comment}
              type="text area"
              style={{ marginBottom: 10 }}
            />
            {
              <Button
                icon="save outline"
                onClick={() => {
                  editedCommentPhoto(photo);
                  getSavedPhotos(userId);
                  //   handleClose();
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
};

export default PhotoEditModal;
