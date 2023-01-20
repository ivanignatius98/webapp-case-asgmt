
const axios = require('axios')

const execApi = (url, payload, method, additionalHeaders = {}) => {
  return new Promise((resolve) => {
    const headers = {
      ...additionalHeaders
    }
    axios({
      url,
      method,
      headers,
      data: payload,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.log(error)
        resolve(error);
      });
  });
};

module.exports = {
  post: async (endpoint, payload, header = {}) => {
    return await execApi(
      `${endpoint}`,
      payload,
      "POST",
      header
    );
  },
  get: async (endpoint, header = {}) => {
    return await execApi(
      `${endpoint}`,
      {},
      "GET",
      header
    );
  },
};