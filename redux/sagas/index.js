import { all, fork } from 'redux-saga/effects'

import * as authSaga from './authSaga'
import * as gitOrgSaga from './gitOrgSaga'
import * as gitRepoSaga from './gitRepoSaga'
import * as commitSaga from './commitSaga';
import * as branchSaga from './branchSaga';
import * as contributorsSaga from './contributorsSaga';
import * as userSaga from './userSaga';
import * as CommitReviewSaga from './commitReviewSaga';
import * as orgDashboardSaga from './orgDashboardSaga';
import * as repoDashboardSaga from './repoDashboardSaga';
import * as userDashboardSaga from './userDashboardSaga'
import * as globalConfig from './globalConfig';


export default function* rootSaga() {
  yield all([
    ...Object.values(authSaga).map(fork),
    ...Object.values(gitOrgSaga).map(fork),
    ...Object.values(gitRepoSaga).map(fork),
    ...Object.values(commitSaga).map(fork),
    ...Object.values(branchSaga).map(fork),
    ...Object.values(contributorsSaga).map(fork),
    ...Object.values(userSaga).map(fork),
    ...Object.values(CommitReviewSaga).map(fork),
    ...Object.values(orgDashboardSaga).map(fork),
    ...Object.values(repoDashboardSaga).map(fork),
    ...Object.values(userDashboardSaga).map(fork),
    ...Object.values(globalConfig).map(fork),
  ]
  )
}
