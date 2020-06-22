import keys from "../keys";
const localURL = "http://localhost:5000";

export default {
  getRoverPhotos(date, camera) {
    return fetch(
      `${keys.curiosityAPI_url}&earth_date=${date}&camera=${camera}&${keys.curiosityAPI_key}`
    ).then((result) => result.json());
  },
  getManifest(date) {
    return fetch(`${keys.curiosityAPI_manifest_url}${keys.curiosityAPI_key}`)
      .then((result) => result.json())
      .then((manifest) => {
        const dateArray = manifest.photo_manifest.photos;
        const foundDate = dateArray.find((obj) => obj.earth_date === date.date);
        return foundDate;
      });
  },
  getDate(date) {
    return fetch(
      `${keys.curiosityAPI_url}&earth_date=${date}&${keys.curiosityAPI_key}`
    ).then((result) => result.json());
  },
  getUserByEmail(email) {
    return fetch(`${localURL}/users?email=${email}`).then((result) =>
      result.json()
    );
  },
  addNewUser(user) {
    return fetch(`${localURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((data) => data.json());
  },
  postSavedPhoto(photo) {
    return fetch(`${localURL}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    }).then((data) => data.json());
  },
  getSavedPhotos(userId) {
    return fetch(`${localURL}/users/${userId}?_embed=photos`).then((data) =>
      data.json()
    );
  },
  putEditedPhoto(editedPhoto) {
    return fetch(`${localURL}/photos/${editedPhoto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPhoto),
    }).then((data) => data.json());
  },
  deletePhoto(id) {
    return fetch(`${localURL}/photos/${id}`, {
      method: "DELETE",
    }).then((result) => result.json());
  },
};
