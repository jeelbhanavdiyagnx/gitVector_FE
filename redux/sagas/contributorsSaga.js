import { call, put, takeLatest } from 'redux-saga/effects';
import appConfig from '@/components/utils/appConfig'
import {
  FETCH_CONTRIBUTORS_REQUEST,
} from '../actions/contributorsAction';

const fetchContributorsApi = async (org, repo) => {

  const response = await fetch(
   appConfig.contributorsUrl(org, repo),
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  );

  if (!response.ok) {    
    const error = await response.text();
    throw new Error(error || 'Failed to fetch contributors');
  }
  
  return response.json();

};

function* fetchContributorsSaga(action) {
  try {
    const { org, repo } = action.payload;
    
    const response = yield call(fetchContributorsApi, org, repo);
    
    yield put({ type: 'FETCH_CONTRIBUTORS_SUCCESS', payload: response?.data });
  } catch (error) {
    yield put({ type: 'FETCH_CONTRIBUTORS_FAILURE', error });
  }
}

export function* watchContributorsSaga() {
  yield takeLatest(FETCH_CONTRIBUTORS_REQUEST, fetchContributorsSaga);
}
