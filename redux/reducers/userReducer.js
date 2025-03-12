import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SEND_INVITE_REQUEST,
  SEND_INVITE_SUCCESS,
  SEND_INVITE_FAILURE,
  GET_INVITEUSERS_REQUEST,
  GET_INVITEUSERS_SUCCESS,
  GET_INVITEUSERS_FAILURE,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
} from '@/redux/actions/userAction';

const initialState = {
  data: [],
  sendInviteData: {
    data: [],
    loading: false,
    error: null
  },
  inviteUsers: {
    data: [],
    loading: false
  },
  removeUsers: {
    data: [],
    loading: false,
  },
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case SEND_INVITE_REQUEST:
        return { ...state, sendInviteData: {loading: true} , error: null };
      case SEND_INVITE_SUCCESS:
        return {
          ...state,
          sendInviteData: {loading: false, data: action.payload},
          error: null
        };
      case SEND_INVITE_FAILURE:
        return {
          ...state,
          sendInviteData: {loading: false, data: [], error: action.payload},
        };
         case GET_INVITEUSERS_REQUEST:
              return { ...state, inviteUsers: { loading: true } };
            case GET_INVITEUSERS_SUCCESS:
              return {
                ...state,
                inviteUsers: { data: action.payload, loading: false },
                error: ''
              };
            case GET_INVITEUSERS_FAILURE:
              return {
                ...state,
                inviteUsers: {
                  data: [],
                  loading: false
                },
                error: action.payload
              };
              case REMOVE_USER_REQUEST:
              return { ...state, removeUsers: { loading: true } };
            case REMOVE_USER_SUCCESS:
              return {
                ...state,
                removeUsers: { data: action.payload, loading: false },
                error: ''
              };
            case REMOVE_USER_FAILURE:
              return {
                ...state,
                removeUsers: {
                  data: [],
                  loading: false
                },
                error: action.payload
              };
    default:
      return state;
  }
};

export default userReducer;
