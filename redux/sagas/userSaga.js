import { all, call, put, takeLatest} from 'redux-saga/effects';
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  SEND_INVITE_REQUEST,
  sendInviteSuccess,
  sendInviteFailure,
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
  GET_INVITEUSERS_REQUEST,
  getInviteUsersSuccess,
  getInviteUsersFailure,
  REMOVE_USER_REQUEST,
  removeUserSuccess,
  removeUserFailure
} from '@/redux/actions/userAction';
import appConfig from '@/components/utils/appConfig';
import { message } from 'antd';

const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch data');
  }
  return response.json();
};


function* fetchUsersSaga(repoId) {
  const repositoryId = repoId?.payload
  try {

    const config = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    
 const url = repositoryId ? `${appConfig.gitUsers}?repo=${repositoryId}&&limit=-1` : appConfig.gitUsers
    const response = yield call(
     fetchApi, 
      url, 
      config
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    yield put(fetchUsersFailure(errorMessage));
  }
}
function* sendInviteSaga(action) {
  const data = action.payload;
  try {
    const options = {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    }
    const response = yield call(fetchApi, appConfig.sendInvite, options)
    yield put(sendInviteSuccess(response.data))
    message.success("Invite sent successfully")
  } catch (error) {
    yield put(sendInviteFailure(error))
    message.error(
      error.message.includes("E11000 duplicate key")
        ? "An invitation to this user has already been sent."
        : "Invalid Git User ID or missing email address. Please verify and try again."
    );
  }
}
function* updateUserSaga(action) {
  const { userId, accessLevel } = action.payload;

  try {
      if (!userId || !accessLevel) {
          throw new Error('Invalid input: userId and accessLevel are required.');
      }
  
      const token = localStorage.getItem('token');
      const options = {
          body: JSON.stringify({ accesslevel: accessLevel }),
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
          },
      };
  
      const response = yield call(fetchApi, `${appConfig.gitUsers}/${userId}`, options);
  
      console.log('Server response:', response);
      yield put(updateUserSuccess(response));
      message.success("User updated successfully")
  } catch (error) {
      console.error('Failed to update user:', error);
      yield put(updateUserFailure(error));
  }
}
function* getInviteUsersSaga() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(fetchApi, appConfig.getInviteUsers, options);
    yield put(getInviteUsersSuccess(response.users));
  } catch (error) {
    yield put(getInviteUsersFailure(error));
    console.log(error, 'error');
  }
}
function* removeUserSaga (action) {
const userId = action.payload;
try {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  
  const response = yield call(fetchApi, `${appConfig.gitUsers}/${userId}`,options)
 
  if (response) {    
    message.success(`User removed Successfully`)
    yield put(removeUserSuccess(response))
      }
} catch (error) {
  yield put(removeUserFailure(error))
  console.log(error)
}
}
function* userSaga() {
  yield all([
     takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga),
     takeLatest(SEND_INVITE_REQUEST, sendInviteSaga),
     takeLatest(UPDATE_USER_REQUEST,updateUserSaga),
     takeLatest(GET_INVITEUSERS_REQUEST,getInviteUsersSaga),
     takeLatest(REMOVE_USER_REQUEST,removeUserSaga),
  ])
 
}

export default userSaga;