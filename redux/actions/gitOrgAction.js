export const FETCH_GITORG_REQUEST = 'FETCH_GITORG_REQUEST';
export const FETCH_GITORG_SUCCESS = 'FETCH_GITORG_SUCCESS';
export const FETCH_GITORG_FAILURE = 'FETCH_GITORG_FAILURE';
export const ADDNEWORGLIST_REQUEST = 'ADDNEWORGLIST_REQUEST';
export const ADDNEWORGLIST_SUCCESS = 'ADDNEWORGLIST_SUCCESS';
export const ADDNEWORGLIST_FAILURE = 'ADDNEWORGLIST_FAILURE';
export const FETCH_ORG_REQUEST = 'FETCH_ORG_REQUEST';
export const FETCH_ORG_SUCCESS = 'FETCH_ORG_SUCCESS';
export const FETCH_ORG_FAILURE = 'FETCH_ORG_FAILURE';
export const UPDATE_ORG_REQUEST = 'UPDATE_ORG_REQUEST';
export const UPDATE_ORG_SUCCESS = 'UPDATE_ORG_SUCCESS';
export const UPDATE_ORG_FAILURE = 'UPDATE_ORG_FAILURE';
export const REMOVE_ORG_REQUEST = 'REMOVE_ORG_REQUEST';
export const REMOVE_ORG_SUCCESS = 'REMOVE_ORG_SUCCESS';
export const REMOVE_ORG_FAILURE = 'REMOVE_ORG_FAILURE';

export const fetchGitOrgRequest = () => ({
    type: FETCH_GITORG_REQUEST,
});

export const fetchGitOrgSuccess = (response) => ({
    type: FETCH_GITORG_SUCCESS,
    payload: response,
});

export const fetchGitOrgFailure = (error) => ({
    type: FETCH_GITORG_FAILURE,
    payload: error,
});

export const addNewOrgListRequest = () => ({
    type: ADDNEWORGLIST_REQUEST,
});

export const addNewOrgListSuccess = (response) => ({
    type: ADDNEWORGLIST_SUCCESS,
    payload: response,
});

export const addNewOrgListFailure = (error) => ({
    type: ADDNEWORGLIST_FAILURE,
    payload: error,
});

export const fetchOrgRequest = () => ({
    type: FETCH_ORG_REQUEST,
});

export const fetchOrgSuccess = (response) => ({
    type: FETCH_ORG_SUCCESS,
    payload: response,
});

export const fetchOrgFailure = (error) => ({
    type: FETCH_ORG_FAILURE,
    payload: error,
});

export const removeOrgRequest = (orgId) => ({
    type: REMOVE_ORG_REQUEST,
    payload: orgId
});

export const removeOrgSuccess = (response) => ({
    type: REMOVE_ORG_SUCCESS,
    payload: response,
});

export const removeOrgFailure = (error) => ({
    type: REMOVE_ORG_FAILURE,
    payload: error,
});

export const updateOrgRequest = (payload) => ({
    type: UPDATE_ORG_REQUEST,
    payload: payload
});

export const updateOrgSuccess = (response) => ({
    type: UPDATE_ORG_SUCCESS,
    payload: response,
});

export const updateOrgFailure = (error) => ({
    type: UPDATE_ORG_FAILURE,
    payload: error,
});