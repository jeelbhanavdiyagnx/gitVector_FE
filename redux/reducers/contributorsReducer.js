import {
  FETCH_CONTRIBUTORS_REQUEST,
  FETCH_CONTRIBUTORS_SUCCESS,
  FETCH_CONTRIBUTORS_FAILURE,
} from '@/redux/actions/contributorsAction';

const initialState = {
  contributors: [],
  loading: false,
  error: null,
};

const contributorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRIBUTORS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CONTRIBUTORS_SUCCESS:
      return { ...state, loading: false, contributors: action.payload };

    case FETCH_CONTRIBUTORS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default contributorsReducer;
