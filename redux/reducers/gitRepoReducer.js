import {
  FETCH_GITREPO_FAILURE,
  FETCH_GITREPO_REQUEST,
  FETCH_GITREPO_SUCCESS,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_USERREPO_FAILURE,
  FETCH_USERREPO_REQUEST,
  FETCH_USERREPO_SUCCESS,
  REMOVE_REPO_FAILURE,
  REMOVE_REPO_REQUEST,
  REMOVE_REPO_SUCCESS,
  REPOUPDATE_FAILURE,
  REPOUPDATE_REQUEST,
  REPOUPDATE_SUCCESS,
  RESET_GITREPO,
} from '@/redux/actions/gitRepoAction';

const initialState = {
  loading: false,
  gitRepos: {
    data: [],
    loading: false,
  },
  repos: [],
  gitRepo_error: '',
  data: [],
  repoupdate_error: null,
  userRepos: {
    data: [],
    loading: false
  },
  removedRepo: {
    data: [],
  }
};

const gitRepoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GITREPO_REQUEST:
      return { ...state, gitRepos: { ...state.gitRepos, loading: true } };
    case FETCH_GITREPO_SUCCESS:
      return {
        ...state,
        loading: false,
        gitRepos: { data: action.payload, loading: false },
        gitRepo_error: ''
      };
    case FETCH_GITREPO_FAILURE:
      return {
        ...state,
        loading: false,
        gitRepos: {data: [], loading: false},
        gitRepo_error: action.payload
      };
    case REPOUPDATE_REQUEST:
      return { ...state, ...action.payload, loading: true };
    case REPOUPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case REPOUPDATE_FAILURE:
      return { ...state, loading: false, repoupdate_error: action.payload };
    case FETCH_REPOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        repoupdate_error: ''
      };
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        repoupdate_error: action.payload
      };
     case RESET_GITREPO: 
     return {
      ...state,
      gitRepos: {
        ...initialState.gitRepos
      }
     }
     case FETCH_USERREPO_REQUEST:
      return { ...state, userRepos: { ...state.userRepos, loading: true } };
    case FETCH_USERREPO_SUCCESS:
      return {
        ...state,
        loading: false,
        userRepos: { data: action.payload, loading: false },
        gitRepo_error: ''
      };
    case FETCH_USERREPO_FAILURE:
      return {
        ...state,
        loading: false,
        userRepos: {data: [], loading: false},
        gitRepo_error: action.payload
      };
      case REMOVE_REPO_REQUEST:
        return{
          ...state,
          removedRepo: {
            data: []
          }
        };
        case REMOVE_REPO_SUCCESS: 
        return{
          ...state,
          removedRepo: {
            data: action.payload
          }
        };
        case REMOVE_REPO_FAILURE:
          return{
            ...state,
            removedRepo: {
              data: [],
            }
          }
    default:
      return state;
  }
};

export default gitRepoReducer;
