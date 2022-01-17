const axios = require('axios');

function request(url, originalOptions) {
  const options = Object.assign({}, originalOptions);

  return axios({
    url: url,
    ...originalOptions
  })
  .then(
    (response) => response.data,
    (error) => {
      return Promise.reject(error);
    }
  )
}

module.exports = request;