import axios from "axios";

/**
 * Action to retrieve and setSecretWord
 * @param {function} setSecretWord
 */
export const getSecretWord = async setSecretWord => {
  const { data } = await axios.get("http://127.0.0.1:3030/");
  setSecretWord(data);
};

// default export
export default {
  getSecretWord
};
