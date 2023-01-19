
const axios = require('axios');
const jwt = require('jsonwebtoken')
const execApi = (serviceName, url, payload, method, additionalHeaders = {}) => {
  return new Promise((resolve) => {
    const headers = {
      // ...generateToken(serviceName),
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
  post: async (serviceName, endpoint, payload, header = {}) => {
    return await execApi(
      serviceName,
      `${endpoint}`,
      payload,
      "POST",
      header
    );
  },
  get: async (serviceName, endpoint, header = {}) => {
    return await execApi(
      serviceName,
      `${endpoint}`,
      {},
      "GET",
      header
    );
  }
};