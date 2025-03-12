import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchJSON } from '@/components/utils/apiCalls';
import appConfig from '@/components/utils/appConfig';
import {
  ADDNEWORGLIST_REQUEST,
  addNewOrgListFailure,
  addNewOrgListSuccess,
  FETCH_GITORG_REQUEST,
  FETCH_ORG_REQUEST,
  fetchGitOrgFailure,
  fetchGitOrgSuccess,
  fetchOrgFailure,
  fetchOrgSuccess,
  REMOVE_ORG_REQUEST,
  removeOrgFailure,
  removeOrgSuccess,
  UPDATE_ORG_REQUEST,
  updateOrgFailure,
  updateOrgSuccess
} from '../actions/gitOrgAction';
import { message } from 'antd';
const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch data');
  }
  return response.json();
};
function* fetchGitOrg() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(fetchApi, appConfig.githubOrgs, options);
    if (response.message === 'Organizations fetched successfully') {
      yield put(fetchGitOrgSuccess(response.data));
    }
  } catch (err) {
    if (err.status !== 200) {
      message.error('Git hub login failed.');
      yield put(fetchGitOrgFailure('Please enter valid credentials.'));
      return;
    }
    console.log(err);
  }
}
function* getOrgSaga () {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(fetchApi, appConfig.getOrgs, options);
    if (response) {
      yield put(fetchOrgSuccess(response.data));
    }
  } catch (err) {
    if (err.status !== 200) {
      message.error('Git hub login failed.');
      yield put(fetchOrgFailure('Please enter valid credentials.'));
      return;
    }
    console.log(err);
  }
}
function* removeOrgSaga (action) {
    const  orgId  = action.payload;
    
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      
      const response = yield call(fetchJSON, `${appConfig.getOrgs}/${orgId}`,options)
      if (response.message === "Organisation deleted successfully") {
        message.success(`Organization removed Successfully`)
           
            yield put(removeOrgSuccess(response))
          }
    } catch (error) {
      console.log(error);
      
      yield put(removeOrgFailure(error))
    }
  
}
function* orgUpdateSaga(action) {
  const options = {
    body: JSON.stringify(action.payload),
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = yield call(fetchJSON, appConfig.getOrgs, options);
    
    message.success("Org added successfully")
    if (response) {
      yield put(updateOrgSuccess(response.data));
    }
  } catch (error) {
    console.log(error, 'error');
    yield put(updateOrgFailure(error))
  }
}
function* addNewOrgListSaga() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(fetchApi, `${appConfig?.socketURL}/api/v1/github/getAddNewOrgList`, options);
   
    if (response) {
      yield put(addNewOrgListSuccess(response.orgs));
    }
  } catch (err) {
    if (err.status !== 200) {
      message.error('Git hub login failed.');
      yield put(addNewOrgListFailure('Please enter valid credentials.'));
      return;
    }
    console.log(err);
  }
}
function* gitOrgSaga() {
  yield all([
     takeLatest(FETCH_GITORG_REQUEST, fetchGitOrg),
     takeLatest(FETCH_ORG_REQUEST, getOrgSaga),
     takeLatest(REMOVE_ORG_REQUEST, removeOrgSaga),
     takeLatest(UPDATE_ORG_REQUEST, orgUpdateSaga),
     takeLatest(ADDNEWORGLIST_REQUEST, addNewOrgListSaga)
  ])
}

export default gitOrgSaga;
