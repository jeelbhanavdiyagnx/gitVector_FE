

import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchJSON } from '@/components/utils/apiCalls'
import appConfig from '@/components/utils/appConfig'
import { message } from 'antd';
import {
  authActionTypes,
  invitedUserSuccess,
  logOutSuccess,
  loginSuccess,
  loginUserFailed,
  profileFailed,
  profileSuccess,
  signupSuccess,
  updateUserProfileFailed, 
  updateUserProfileSuccess,
} from '../actions/authAction'
import axios from 'axios';

function* loginSaga({ payload: { username, password } }) {
  if (username === undefined || password === undefined) {
    let message = 'Invalid credentials'
    yield put(loginUserFailed(message))
    return
  }
  try {
    const options = {
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    const response = yield call(fetchJSON, appConfig.loginUrl, options)
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userInfo', JSON.stringify(response.data.user))
      message.success("Logged inn successfully")
      yield put(loginSuccess(response.data))
    }
  } catch (err) {
    if (err.status !== 200) {
      message.error('Please enter valid credentials.')
      yield put(loginUserFailed('Please enter valid credentials.'))
      return
    }
    console.log(err)
  }
}
function* githubLoginSaga() {
  try {
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
    let connectCode = localStorage.getItem("code");
    const response = yield call(axios.get, `${appConfig.github}?code=${connectCode}`, options);    
    if (response) {
      message.success("Github Connected");
      localStorage.setItem('token', response.data.token); // Store the token
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      yield put(loginSuccess(response.data))
    }
  } catch (err) {
    if (err.status !== 200) {
      message.error('Git hub login failed.')
      yield put(loginUserFailed('Please enter valid credentials.'))
      return
    }
    console.log(err)
  }
}
// signup Saga
function* signup({ payload: { username, email, password } }) {
  if (email === undefined || password === undefined) {
    let message = 'Invalid credentials';
    yield put(loginUserFailed(message));
    return;
  }
  try {
    const options = {
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = yield call(fetchJSON, appConfig.register, options);
    // Check the status in the response directly
    if (response.status === 200) {
      yield put(signupSuccess(response.data.message));
      message.success("User registered successfully");  // Use the correct success message
    } else {
      message.error("Registration failed. Response status: " + response.status);  // Handle other status codes
    }
  } catch (err) {
    // General error handling
    console.error("Error during signup:", err);
    message.error("User already exists or an error occurred during registration.");
    yield put(loginUserFailed('An error occurred.'));
  }
}


function* logOutSaga() {
  try {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    localStorage.removeItem('path')
    localStorage.removeItem("commitReviews");
    yield put(logOutSuccess())
  } catch (err) {
    console.log(err)
  }
}
function* updateProfile({ id, payload, userId }) {
  const options = {
    body: JSON.stringify(payload),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  try {
    const response = yield call(fetchJSON, fetchURL, options);
    if (
      response.statusCode === 403 ||
      response.statusCode === 400 ||
      response.statusCode === 404
    ) {
      yield put(failure(true));
      message.error("Unable to update the profile");
    } else {
      const userResponse = yield call(getUser, userId);
      localStorage.setItem("userInfo", JSON.stringify(userResponse));
      if (userResponse) {
        yield put(updateDoctorProfileSuccess(userResponse));
        message.info(" Profile Updated Successfully");
      }
    }
  } catch (err) {
    yield put(failure(true));
  }
}

  function* getProfileSaga() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      const response = yield call(fetchJSON, appConfig.me, options);
      
      if (response.message === 'Fetched profile successfully') {
        yield put(profileSuccess(response));
      }
    } catch (err) {
      if (err.status !== 200) {
        message.error('Git hub login failed.');
        yield put(profileFailed('Please enter valid credentials.'));
        return;
      }
      console.log(err);
    }
  } 

  function* editUserProfileSaga({ payload: { username, email, currPassword, password } }) {
    
    const options = {
      body: JSON.stringify({
        "username": username,
        "email": email
      }),
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    const passwordUpdateOptions = {
      body: JSON.stringify({
        "currentPassword": currPassword,
        "newPassword": password
      }),
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    
    try {
      const response = yield call(fetchJSON, appConfig.editUser, options);
      var passwordUpdateResponse; 
      if (password && currPassword) {
         passwordUpdateResponse = yield call(fetchJSON, appConfig.editPassword, passwordUpdateOptions);
        
      }
      
      if (response || passwordUpdateResponse) {
        yield put(updateUserProfileSuccess(response,passwordUpdateResponse));
        message.success("Profile updated successfully")
      }
    } catch (error) {
      console.log(error, 'error');
      yield put(updateUserProfileFailed(error))
    }
  }
function* getInvitedUserDataSaga (payload) {
  console.log(payload.payload);
  
try {
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }

  const response = yield call(fetchJSON, appConfig.getInvitedUserData(payload.payload), options);
  console.log(response);
  
  yield put(invitedUserSuccess(response?.data))
} catch (error) {
  console.log(error);
  
}
}
function* authSaga() {
  yield all([
    takeLatest(authActionTypes.LOGIN_REQUEST, loginSaga),
    takeLatest(authActionTypes.SIGNUP_REQUEST, signup),
    takeLatest(authActionTypes.LOGOUT, logOutSaga),
    takeLatest(authActionTypes.UPDATE_PROFILE, updateProfile),
    takeLatest(authActionTypes.GITHUB_LOGIN,githubLoginSaga),
    takeLatest(authActionTypes.PROFILE_REQUEST,getProfileSaga),
    takeLatest(authActionTypes.USERPROFILE_UPDATE_REQUEST, editUserProfileSaga),
    takeLatest(authActionTypes.INVITED_USER_REQUEST, getInvitedUserDataSaga)
  ])
}

export default authSaga
