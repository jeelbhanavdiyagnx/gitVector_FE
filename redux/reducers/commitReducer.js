import {
  FETCH_COMMITS_REQUEST,
  FETCH_COMMITS_SUCCESS,
  FETCH_COMMITS_FAILURE
} from '@/redux/actions/commitActions';

const initialState = {
  commits: [],
  loading: false,
  error: null
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMITS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COMMITS_SUCCESS:
      return { ...state, commits: action.payload, loading: false };
    case FETCH_COMMITS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default commitReducer;
