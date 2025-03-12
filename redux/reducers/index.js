import { combineReducers } from 'redux'
import authReducer from './authReducer'
import gitOrgReducer from './gitOrgReducer';
import gitRepoReducer from './gitRepoReducer';
import commitReducer from './commitReducer';
import branchReducer from './branchReducer';
import contributorsReducer from './contributorsReducer';
import userReducer from './userReducer';
import commitReviewReducer from './commitReviewReducer';
import orgDashboardReducer from './orgDashboardReducer';
import repoDashboardReducer from './repoDashboardReducer';
import userDashboardReducer from './userDashboardReducer';
import globalReducer from './globalReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  gitOrg: gitOrgReducer,
  gitRepo: gitRepoReducer,
  gitUser: userReducer,
  commit: commitReducer,
  branch: branchReducer,
  contributors: contributorsReducer,
  commitReviews: commitReviewReducer,
  orgDashboardData: orgDashboardReducer,
  repoDashboardData: repoDashboardReducer,
  userDashboardData: userDashboardReducer,
  globalData: globalReducer
})

export default rootReducer;
