import {
  ADDNEWORGLIST_FAILURE,
  ADDNEWORGLIST_REQUEST,
  ADDNEWORGLIST_SUCCESS,
  FETCH_GITORG_FAILURE,
  FETCH_GITORG_REQUEST,
  FETCH_GITORG_SUCCESS,
  FETCH_ORG_FAILURE,
  FETCH_ORG_REQUEST,
  FETCH_ORG_SUCCESS,
  REMOVE_ORG_FAILURE,
  REMOVE_ORG_REQUEST,
  REMOVE_ORG_SUCCESS,
  UPDATE_ORG_FAILURE,
  UPDATE_ORG_REQUEST,
  UPDATE_ORG_SUCCESS
} from '@/redux/actions/gitOrgAction';

const initialState = {
  loading: false,
  gitOrgs: [],
  orgsData: {
    data: [],
    loading: false
  },
  updateOrgState: {
    data: [],
    loading: false
  },
  removedOrgState: {
    data: [],
    loading: false
  },
addNewOrgList: {
  data: [],
  loading: false
},
  error: ''
};

const gitOrgReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GITORG_REQUEST:
      return { ...state, loading: true };
    case FETCH_GITORG_SUCCESS:
      return { ...state, loading: false, gitOrgs: action.payload, error: '' };
    case FETCH_GITORG_FAILURE:
      return { ...state, loading: false, gitOrgs: [], error: action.payload };
    case FETCH_ORG_REQUEST:
      return { ...state, orgsData: { loading: true } };
    case FETCH_ORG_SUCCESS:
      return {
        ...state,
        orgsData: { data: action.payload, loading: false },
        error: ''
      };
    case FETCH_ORG_FAILURE:
      return {
        ...state,
        orgsData: {
          data: [],
          loading: false
        },
        error: action.payload
      };
      case ADDNEWORGLIST_REQUEST:
        return { ...state, addNewOrgList: { loading: true } };
      case ADDNEWORGLIST_SUCCESS:
        return {
          ...state,
          addNewOrgList: { data: action.payload, loading: false },
          error: ''
        };
      case ADDNEWORGLIST_FAILURE:
        return {
          ...state,
          addNewOrgList: {
            data: [],
            loading: false
          },
          error: action.payload
        };
    case UPDATE_ORG_REQUEST:
      return { ...state, updateOrgState: { loading: true } };
    case UPDATE_ORG_SUCCESS:
      return {
        ...state,
        updateOrgState: { data: action.payload, loading: false },
        error: ''
      };
    case UPDATE_ORG_FAILURE:
      return {
        ...state,
        updateOrgState: {
          data: [],
          loading: false
        },
        error: action.payload
      };
      case REMOVE_ORG_REQUEST:
      return { ...state, removedOrgState: { loading: true } };
    case REMOVE_ORG_SUCCESS:
      return {
        ...state,
        removedOrgState: { data: action.payload, loading: false },
        error: ''
      };
    case REMOVE_ORG_FAILURE:
      return {
        ...state,
        removedOrgState: {
          data: [],
          loading: false
        },
        error: action.payload
      };
    default:
      return state;
  }
};

export default gitOrgReducer;
