export const FETCH_CONTRIBUTORS_REQUEST = 'FETCH_CONTRIBUTORS_REQUEST';
export const FETCH_CONTRIBUTORS_SUCCESS = 'FETCH_CONTRIBUTORS_SUCCESS';
export const FETCH_CONTRIBUTORS_FAILURE = 'FETCH_CONTRIBUTORS_FAILURE';

export const fetchContributorsRequest = (org, repo) => ({
  type: FETCH_CONTRIBUTORS_REQUEST,
  payload: { org, repo },
});

export const fetchContributorsSuccess = (contributors) => ({
  type: FETCH_CONTRIBUTORS_SUCCESS,
  payload: contributors.data,
});

export const fetchContributorsFailure = (error) => ({
  type: FETCH_CONTRIBUTORS_FAILURE,
  payload: error,
});
