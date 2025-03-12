export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
export const REMOVE_USER_FAILURE = 'REMOVE_USER_FAILURE';
export const SEND_INVITE_REQUEST = 'SEND_INVITE_REQUEST';
export const SEND_INVITE_SUCCESS = 'SEND_INVITE_SUCCESS';
export const SEND_INVITE_FAILURE = 'SEND_INVITE_FAILURE';
export const GET_INVITEUSERS_REQUEST = 'GET_INVITEUSERS_REQUEST';
export const GET_INVITEUSERS_SUCCESS = 'GET_INVITEUSERS_SUCCESS';
export const GET_INVITEUSERS_FAILURE = 'GET_INVITEUSERS_FAILURE';

export const fetchUsersRequest = (repositoryId) => ({
  type: FETCH_USERS_REQUEST,
  payload: repositoryId
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error
});

export const updateUserRequest = (userId, accessLevel) => ({
  type: UPDATE_USER_REQUEST,
  payload: {userId, accessLevel}
});

export const updateUserSuccess = (response) => ({
  type: UPDATE_USER_SUCCESS,
  payload: response
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error
});

export const removeUserRequest = (userId) => ({
  type: REMOVE_USER_REQUEST,
  payload: userId
});

export const removeUserSuccess = (response) => ({
  type: REMOVE_USER_SUCCESS,
  payload: response
});

export const removeUserFailure = (error) => ({
  type: REMOVE_USER_FAILURE,
  payload: error
});

export const sendInviteRequest = (data) => ({
  type: SEND_INVITE_REQUEST,
  payload: data
});

export const sendInviteSuccess = (response) => ({
  type: SEND_INVITE_SUCCESS,
  payload: response
});

export const sendInviteFailure = (error) => ({
  type: SEND_INVITE_FAILURE,
  payload: error
});

export const getInviteUsersRequest = () => ({
  type: GET_INVITEUSERS_REQUEST
});

export const getInviteUsersSuccess = (response) => ({
  type: GET_INVITEUSERS_SUCCESS,
  payload: response
});

export const getInviteUsersFailure = (error) => ({
  type: GET_INVITEUSERS_FAILURE,
  payload: error
});