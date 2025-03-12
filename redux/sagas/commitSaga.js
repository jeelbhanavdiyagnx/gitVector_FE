import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_COMMITS_REQUEST,
  fetchCommitsSuccess,
  fetchCommitsFailure
} from '../actions/commitActions';
import appConfig from '@/components/utils/appConfig';

const fetchCommitsApi = async (repo) => {
  const response = await fetch(appConfig.commitsRepoUrl(repo), {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch commits');
  }

  return response.json();
};

function* fetchCommits(action) {
  try {
    const repo = action.payload;
    const response = yield call(fetchCommitsApi, repo);
    yield put(fetchCommitsSuccess(response?.data));
  } catch (error) {
    yield put(fetchCommitsFailure(error.message));
  }
}


export default function* commitSaga() {
  yield takeLatest(FETCH_COMMITS_REQUEST, fetchCommits);
}
