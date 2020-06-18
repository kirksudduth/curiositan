import keys from "../keys";
const localURL = "http://localhost:5000";

export default {
  getCamera(date, camera) {
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
        console.log("foundDate: ", foundDate);
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
};
