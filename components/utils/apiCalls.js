import axios from 'axios'
import appConfig from './appConfig'
import _ from 'lodash-contrib'


const cachios = require('cachios')

export const makeHeader = (jwt) => {
  let ujwt = jwt
  if (!jwt) {
    ujwt = localStorage.getItem('token')
  }
  return {
    headers: {
      Authorization: 'Bearer ' + ujwt,
    },
  }
}

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */

const fetchJSON = (url, options = {}) => {
  const isSuccessStatus = (status) => [200, 201].includes(status);

  if (_.isEmpty(options) || options.method === 'GET') {
    return cachios
      .get(url, { ...options, ttl: 60 * 60 * 3 })
      .then((response) => {
        if (!isSuccessStatus(response.status)) {
          throw response.data;
        }
        return response.data;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  } else if (options.method === 'POST') {
    return cachios
      .post(url, JSON.parse(options.body), { ...options, ttl: 60 * 60 * 3 })
      .then((response) => {
        if (!isSuccessStatus(response.status)) {
          throw response;
        }
        return response;
      })
      .catch((error) => {
        throw error.response;
      });
  } else if (options.method === 'PUT') {
    return fetch(url, options)
      .then((response) => {
        if (!isSuccessStatus(response.status)) {
          throw response.json();
        }
        return response.json();
      })
      .then((json) => json)
      .catch((error) => {
        throw error;
      });
  } else if (options.method === 'DELETE') {
    return fetch(url, options)
      .then((response) => {
        if (!isSuccessStatus(response.status)) {
          throw response.json();
        }
        return response.json();
      })
      .then((json) => json)
      .catch((error) => {
        throw error;
      });
  }
};


const updatePassword = async (id, data) => {
  let url = appConfig.users + '/' + id
  let header = makeHeader()
  try {
    const response = await axios.put(url, data, header)
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}
const register = async (data) => {
  try {
    const response = await axios.post(appConfig.register, data)
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}
const forgotPassword = async (data) => {
  try {
    const response = await axios.post(appConfig.forgotPassword, data)
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}
const resetPassword = async (data) => {
  try {
    const response = await axios.post(appConfig.resetPassword, data)
    return response.data
  } catch (err) {
    throw new Error(err)
  }
}

const getUser  = async(id)=>{
  let header = makeHeader()
  try {
    const response = await axios.get(`${appConfig.users}/${id}`, header)
    return response.data;
  } catch (err) {
    throw new Error(err)
  }
}

const getGitRepos = async()=>{
  //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWY4YjAwZjI0NDYxNWU1ODE3ZTcyZCIsImlhdCI6MTczMDEyMDQ0OCwiZXhwIjoxNzMyNzEyNDQ4fQ.42L7Unw__tCzpSItm9XQMpH1_hRe-cf9Uz3hk5-3O6A'
  try {
    const response = await axios.get(`${appConfig.gitRepos}`,{ headers: {
      Authorization:  `Bearer ${token}`,
      "Content-Type": 'application/json'
    }})
    return response.data;
  } catch (error) {
    throw new Error(err)
  }
}

export {
  fetchJSON,
  getUser,
  updatePassword,
  register,
  forgotPassword,
  resetPassword,
  getGitRepos
}
