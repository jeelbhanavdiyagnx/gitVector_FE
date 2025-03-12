import { call, put, takeLatest } from 'redux-saga/effects';
import appConfig from '@/components/utils/appConfig';
import { FETCH_COMMITREVIEW_REQUEST } from '../actions/commitReviewAction';

const fetchCommitReviewApi = async (repo, user, type, sort, skip) => {
  
  const url = (() => {
    let baseUrl = appConfig.commitsRepoUrl(repo, skip);

    // Check if there are any query parameters to add
    if (type || user || sort) {
      baseUrl += '&';
      const params = [];

      if (type) params.push(`commitClassification=${type}`);
      if (user) params.push(`gitUser=${user}`);
      if (sort) params.push(`sort=score.final_score:${sort}`);
      

      // Join all parameters with '&' and append to the base URL
      baseUrl += params.join('&');
    }

    return baseUrl;
  })();

  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch commit review');
  }

  return response.json();
};

function* fetchCommitReviewSaga(action) {
  const { repo, user, type, sort, skip } = action.payload;
  if (!repo) {
    yield put({ type: 'FETCH_COMMITREVIEW_RESET' });
    return;
  }
  try {
    const response = yield call(
      fetchCommitReviewApi,
      repo,
      user,
      type,
      sort,
      skip
    );
    yield put({
      type: 'FETCH_COMMITREVIEW_SUCCESS',
      payload: response?.data, // Review data
      pagination: response?.pagination // Pagination details
    });
  } catch (error) {
    yield put({ type: 'FETCH_COMMITREVIEW_FAILURE', error });
  }
}

export default function* CommitReviewSaga() {
  yield takeLatest(FETCH_COMMITREVIEW_REQUEST, fetchCommitReviewSaga);
}
