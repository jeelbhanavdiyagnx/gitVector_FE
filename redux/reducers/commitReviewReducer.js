import {
  FETCH_COMMITREVIEW_REQUEST,
  FETCH_COMMITREVIEW_SUCCESS,
  FETCH_COMMITREVIEW_FAILURE,
  FETCH_COMMITREVIEW_RESET
} from '@/redux/actions/commitReviewAction';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  pagination: {
    limit: 10, // Default limit for pagination
    skip: 0, 
    total: 0 
  }
};

const commitReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMITREVIEW_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_COMMITREVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [...state.reviews, ...action.payload], // Append new reviews
        pagination: action.pagination
      };

    case FETCH_COMMITREVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_COMMITREVIEW_RESET:
      return initialState;

    default:
      return state;
  }
};

export default commitReviewReducer;
