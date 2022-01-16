import axios from 'axios';

export default function(url, originalOptions) {
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