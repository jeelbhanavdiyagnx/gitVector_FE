export const FETCH_COMMITS_REQUEST = 'FETCH_COMMITS_REQUEST';
export const FETCH_COMMITS_SUCCESS = 'FETCH_COMMITS_SUCCESS';
export const FETCH_COMMITS_FAILURE = 'FETCH_COMMITS_FAILURE';

export const fetchCommitsRequest = (repo) => ({
  type: FETCH_COMMITS_REQUEST,
  payload: repo
});
export const fetchCommitsSuccess = (commits) => ({
  type: FETCH_COMMITS_SUCCESS,
  payload: commits
});
export const fetchCommitsFailure = (error) => ({
  type: FETCH_COMMITS_FAILURE,
  payload: error
});
