import keys from "../keys";

export default {
  get() {
    return fetch(keys.curiosityAPI_url);
  },
};
