export const authActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  GITHUB_LOGIN: 'GITHUB_LOGIN',

  LOGIN_FAILED: 'LOGIN_FAILED',

  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  PROFILE_REQUEST: 'PROFILE_REQUEST',
  PROFILE_SUCCESS: 'PROFILE_SUCCESS',
  PROFILE_FAILED: 'PROFILE_FAILED',
  USERPROFILE_UPDATE_REQUEST: 'USERPROFILE_UPDATE_REQUEST',
  USERPROFILE_UPDATE_SUCCESS: 'USERPROFILE_UPDATE_SUCCESS',
  USERPROFILE_UPDATE_FAILED: 'USERPROFILE_UPDATE_FAILED',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  INVITED_USER_REQUEST: 'INVITED_USER_REQUEST',
  INVITED_USER_SUCCESS: 'INVITED_USER_SUCCESS',
  INVITED_USER_FAILURE: 'INVITED_USER_FAILURE',
};

export function login(username, password) {
  return {
    type: authActionTypes.LOGIN_REQUEST,
    payload: {
      username,
      password
    }
  };
}
export function githubLogin() {
  return {
    type: authActionTypes.GITHUB_LOGIN
  };
}
export function signup(username, email, password) {
  return {
    type: authActionTypes.SIGNUP_REQUEST,
    payload: {
      username,
      email,
      password
    }
  };
}
export function signupRequest() {
  return { type: authActionTypes.SIGNUP_REQUEST, payload: {} };
}

export function signupSuccess(response) {
  return {
    type: authActionTypes.SIGNUP_SUCCESS,
    payload: response
  };
}

export function loginRequest() {
  return { type: authActionTypes.LOGIN_REQUEST, payload: {} };
}

export function loginSuccess(response) {
  // Store the JWT in local storage when the user logs in
  localStorage.setItem('token', response.token);
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    payload: response
  };
}

export function loginUserFailed(response) {
  return { type: authActionTypes.LOGIN_FAILED, payload: response };
}

export function logOut() {
  return { type: authActionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: authActionTypes.LOGOUT_SUCCESS };
}
export function profileRequest (){
    return { type: authActionTypes.PROFILE_REQUEST };
};
export function profileSuccess (response){
    return { type: authActionTypes.PROFILE_SUCCESS, payload: response };
};
export function profileFailed (error){
    return { type: authActionTypes.PROFILE_FAILED, payload: error };
};

export function updateProfile(username, password) {
  return {
    type: authActionTypes.UPDATE_PROFILE,
    payload: {
      username,
      password
    }
  };
}

export function updateUserProfileRequest(username,email,currPassword,password) {
  return {
        type: authActionTypes.USERPROFILE_UPDATE_REQUEST,
        payload: {
          username,
          email,
          currPassword,
          password
        }
      };
}
export function updateUserProfileSuccess(response) {
  return {
        type: authActionTypes.USERPROFILE_UPDATE_SUCCESS,
        payload:response
      };
}
export function updateUserProfileFailed(error) {
  return {
        type: authActionTypes.USERPROFILE_UPDATE_FAILED,
        payload: error
      };
}

export function invitedUserRequest(id) {
  return {
    type: authActionTypes.INVITED_USER_REQUEST,
    payload: id
  }
}

export function invitedUserSuccess(response) {
  return {
    type: authActionTypes.INVITED_USER_SUCCESS,
    payload: response
  }
}

export function invitedUserFailure(error) {
  return {
    type: authActionTypes.INVITED_USER_FAILURE,
    payload: error
  }
}
