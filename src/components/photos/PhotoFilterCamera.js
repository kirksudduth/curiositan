import React, { useEffect, useState } from "react";
import DataManager from "../../modules/DataManager";
import { Dropdown, Card, Image, Grid } from "semantic-ui-react";

const PhotoFilterCamera = (props) => {
  const editModal = props.editModal;
  const deleteModal = props.deleteModal;
  //   const [cameras, setCameras] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cameraFilterPics, setCameraFilterPics] = useState([]);
  const user = JSON.parse(sessionStorage.credentials);
  const getUserWithSavedPhotos = DataManager.getUserWithSavedPhotos;
  const filterByCamera = () => {
    getUserWithSavedPhotos(user.id).then((result) => setPhotos(result.photos));
  };

  const showFilteredPhotos = (camera) => {
    const filteredPhotos = photos.filter((obj) => obj.camera === camera);
    setCameraFilterPics(filteredPhotos);
  };

  const cameraOptions = [
    { key: "MAST", text: "Mast Cameras - (MAST)", value: "MAST", id: "MAST" },
    {
      key: "NAVCAM",
      text: "Navigation Cameras - (NAVCAM)",
      value: "NAVCAM",
      id: "NAVCAM",
    },
    {
      key: "FHAZ",
      text: "Front Hazard Avoidance Camera - (FHAZ)",
      value: "FHAZ",
      id: "FHAZ",
    },
    {
      key: "RHAZ",
      text: "Rear Hazard Avoidance Camera - (RHAZ)",
      value: "RHAZ",
      id: "RHAZ",
    },
    {
      key: "CHEMCAM",
      text: "Chemistry and Camera Complex - (CHEMCAM)",
      value: "CHEMCAM",
      id: "CHEMCAM",
    },
    {
      key: "MAHLI",
      text: "Mars Hand Lens Imager - (MAHLI)",
      value: "MAHLI",
      id: "MAHLI",
    },
    {
      key: "MARDI",
      text: "Mars Descent Imager - (MARDI)",
      value: "MARDI",
      id: "MARDI",
    },
  ];

  useEffect(() => {
    filterByCamera();
  }, [cameraFilterPics]);

  //   useEffect(() => {
  //     showFilteredPhotos();
  //   }, [cameraFilterPics]);

  return (
    <>
      <Grid centered>
        <Grid.Row style={{ marginTop: 20 }}>
          <Dropdown
            button
            className="icon"
            floating
            labeled
            icon="retro camera"
            options={cameraOptions}
            // search
            placeholder="Select Camera"
            onClose={(event) => {
              event.persist();
              const camera = event.nativeEvent.path[1].id;
              showFilteredPhotos(camera);
            }}
          />
        </Grid.Row>
      </Grid>
      {cameraFilterPics.reverse().map((photo) => (
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
    </>
  );
};

export default PhotoFilterCamera;
