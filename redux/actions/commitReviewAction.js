export const FETCH_COMMITREVIEW_REQUEST = 'FETCH_COMMITREVIEW_REQUEST';
export const FETCH_COMMITREVIEW_SUCCESS = 'FETCH_COMMITREVIEW_SUCCESS';
export const FETCH_COMMITREVIEW_FAILURE = 'FETCH_COMMITREVIEW_FAILURE';
export const FETCH_COMMITREVIEW_RESET = 'FETCH_COMMITREVIEW_RESET';

export const fetchCommitReviewRequest = (repo, user, type, sort, skip = 0) => ({
  type: FETCH_COMMITREVIEW_REQUEST,
  payload: { repo, user, type, sort, skip },
});

export const fetchCommitReviewSuccess = (response) => ({
  type: FETCH_COMMITREVIEW_SUCCESS,
  payload: response,
});

export const fetchCommitReviewFailure = (error) => ({
  type: FETCH_COMMITREVIEW_FAILURE,
  payload: error,
});

export const fetchCommitReviewReset = () => ({
  type: FETCH_COMMITREVIEW_RESET,
});