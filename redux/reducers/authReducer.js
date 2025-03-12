import { authActionTypes } from "../actions/authAction";

export const initialState = {
  isLoggedIn: false,
  jwt: "",
  profile: {},
  user: {},
  loading: false,
  message: "",
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        jwt: "",
        user: {},
        loading: true,
        message: "",
      };

    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user || {},
        loading: false,
        jwt: action.payload.token,
      };

    case authActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        loading: false,
        message: action.payload,
        jwt: "",
      };

      case authActionTypes.PROFILE_REQUEST:
            return { ...state, loading: true };
          case authActionTypes.PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload, error: '' };
          case authActionTypes.PROFILE_FAILED:
            return { loading: false, profile: {}, error: action.payload };

    case authActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case authActionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("commitReviews");
      localStorage.removeItem('token');
      return initialState;

    default:
      return state;
  }
}
export default authReducer;
