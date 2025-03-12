import {
  FETCH_BRANCHES_REQUEST,
  FETCH_BRANCHES_SUCCESS,
  FETCH_BRANCHES_FAILURE,
  SET_SELECTED_BRANCH
} from '@/redux/actions/branchActions';

const initialState = {
  branches: [],
  loading: false,
  error: null,
  selectedBranchId: null
};

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANCHES_REQUEST:
      return { ...state, loading: true };
    case FETCH_BRANCHES_SUCCESS:
      return { ...state, loading: false, branches: action.payload };
    case FETCH_BRANCHES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SELECTED_BRANCH:
      return {
        ...state,
        selectedBranchId: action.payload
      };
    default:
      return state;
  }
};

export default branchReducer;
