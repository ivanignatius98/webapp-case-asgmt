
const axios = require('axios')
const execApi = (url, payload, method, additionalHeaders = {}, params = {}) => {
  return new Promise((resolve) => {
    const headers = {
      ...additionalHeaders
    }
    axios({
      url,
      method,
      headers,
      data: payload,
      params
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
  get: async (endpoint, header = {}, params) => {
    return await execApi(
      `${endpoint}`,
      {},
      "GET",
      header,
      params
    );
  },
  delete: async (endpoint, header = {}) => {
    return await execApi(
      `${endpoint}`,
      {},
      "DELETE",
      header
    );
  },
};