export const FETCH_BRANCHES_REQUEST = 'FETCH_BRANCHES_REQUEST';
export const FETCH_BRANCHES_SUCCESS = 'FETCH_BRANCHES_SUCCESS';
export const FETCH_BRANCHES_FAILURE = 'FETCH_BRANCHES_FAILURE';
export const SET_SELECTED_BRANCH = 'SET_SELECTED_BRANCH';


export const fetchBranchesRequest = (repo) => ({
  type: FETCH_BRANCHES_REQUEST,
  payload: repo
});

export const fetchBranchesSuccess = (branches) => ({
  type: FETCH_BRANCHES_SUCCESS,
  payload: branches,
});

export const fetchBranchesFailure = (error) => ({
  type: FETCH_BRANCHES_FAILURE,
  payload: error,
});

export const setSelectedBranch = (branchId) => ({
    type: SET_SELECTED_BRANCH,
    payload: branchId
  });