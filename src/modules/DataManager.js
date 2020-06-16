import keys from "../keys";
const localURL = "http://localhost:5000";

export default {
  getCamera(date, camera) {
    return fetch(
      `${keys.curiosityAPI_url}&earth_date=${date}&camera=${camera}&${keys.curiosityAPI_key}`
    ).then((result) => result.json());
  },
  getDate(date) {
    return fetch(
      `${keys.curiosityAPI_url}&earth_date=${date}&${keys.curiosityAPI_key}`
    );
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