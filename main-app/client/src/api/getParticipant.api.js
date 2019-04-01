import axios from 'axios';
//import { API_ENDPOINT } from 'get_uri';
import { API_BASE_URL } from '../config/url_config';

import { userAuth } from '../utilities/auth';

const authToken = userAuth.getAuthToken();

const getParticipant = (id, successFn, errorFn) => {
  let config = {
    headers: {
      // Provide user's auth token as credentials
      Authorization: `Bearer ${authToken}`,
    }
  }
  return axios.get(`${API_BASE_URL}/participants/${id}`, config, {
    timeout: 3000,
  })
  .then(res => {
    let { data } = res;
    successFn(data[0]);
    return res;
  })
  .catch(err => {
    console.error(err);
    let { message } = err;
    if (err.code === 'ECONNABORTED') {
      message = 'The request took too long - please try again later.';
    }
    errorFn(message);
    return err;
  })
}

export default getParticipant;