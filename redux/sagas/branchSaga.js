import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_BRANCHES_REQUEST, fetchBranchesSuccess, fetchBranchesFailure } from '../actions/branchActions';
import appConfig from '@/components/utils/appConfig';

const fetchBranchesApi = async (repo) => {
  const response = await fetch(
   appConfig.branchUrl(repo),
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch branches');
  }

  return response.json();
};

function* fetchBranches(action) {
  try {
    const repo  = action.payload;
    const response = yield call(fetchBranchesApi, repo)      
    yield put({ type: 'FETCH_BRANCHES_SUCCESS', payload: response?.data });
  } catch (error) {
    yield put({ type: 'FETCH_BRANCHES_FAILURE', error });
  }
}

export default function* branchSaga() {
  yield takeLatest(FETCH_BRANCHES_REQUEST, fetchBranches);
}
