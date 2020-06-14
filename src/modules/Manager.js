import keys from "../keys";

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
};
