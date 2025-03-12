import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchJSON } from '@/components/utils/apiCalls';
import appConfig from '@/components/utils/appConfig';
import {
  FETCH_GITREPO_REQUEST,
  FETCH_REPOS_REQUEST,
  FETCH_USERREPO_REQUEST,
  fetchGitRepoFailure,
  fetchGitRepoSuccess,
  fetchReposSuccess,
  fetchUserRepoSuccess,
  REMOVE_REPO_REQUEST,
  removeRepoFailure,
  removeRepoSuccess,
  REPOUPDATE_REQUEST,
  repoUpdateSuccess
} from '@/redux/actions/gitRepoAction';
import { message } from 'antd';

function* fetchGitRepo(action) {
  const org = action.payload
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    const response = yield call(
      fetchJSON,
      appConfig.gitRepos + `/api/v1/github/orgs/${org}/repos`,
      options
    );
    const usersData = response.data;
    
    const updatedUsersData = yield call(replaceUserIdWithGithubId, usersData, org);
    if (response.message === 'Repositories fetched successfully') {
      yield put(fetchGitRepoSuccess(updatedUsersData));
    }
  } catch (err) {
    if (err.status == 200) {
      message.error('Git hub login failed.');
      yield put(fetchGitRepoFailure('Please enter valid credentials.'));
      return;
    }
    console.log(err);
  }
}
function* replaceUserIdWithGithubId(usersData,org) {
  const updatedData = [];

  for (let user of usersData) {
    try {
      const githubId = yield call(getGithubId, user.id,org);
      const updatedUser = { ...user, githubId: githubId };
      delete updatedUser.id;
      updatedData.push(updatedUser);
    } catch (error) {
      // console.log(error);
      updatedData.push({ ...user, githubId: null });
    }
  }

  return updatedData;
}
function* getGithubId(userId,org) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(
      fetchJSON,
      appConfig.gitRepos + `/api/v1/github/orgs/${org}/repos`,
      options
    );
    const result = response.data.find((i) => i?.id === userId);
    return result.id;
  } catch (error) {
    throw new Error('Failed to fetch GitHub ID');
  }
}
function* repoUpdateSaga(action) {
  const options = {
    body: JSON.stringify(action.payload),
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = yield call(fetchJSON, appConfig.repoAdd, options);
    
    message.success("Repository added successfully")
    if (response) {
      yield put(repoUpdateSuccess(response.data));
    }
  } catch (error) {
    console.log(error, 'error');
  }
}

function* getReposSaga() {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(fetchJSON, appConfig.repoAdd, options);
    
    yield put(fetchReposSuccess(response.data));

  } catch (error) {
    console.log(error, 'error');
  }
}

function* removeRepoSaga (action) {
  const  repo  = action.payload;
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    
    const response = yield call(fetchJSON, appConfig.removeRepo(repo),options)
   
    if (response.message === "Repository deleted successfully") {
      message.success(`${repo.slice(repo.indexOf("/") + 1)} repository removed Successfully`)
         
          yield put(removeRepoSuccess(response))
        }
  } catch (error) {
    yield put(removeRepoFailure(error))
    console.log(error)
  }
}

function* fetchUserRepoSaga(action) {
  const userId = action.payload;
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = yield call(fetchJSON, appConfig.getUserRepos(userId), options);
    yield put(fetchUserRepoSuccess(response.data));
    console.log(response.data);
    
  } catch (error) {
    console.log(error, 'error');
  }
}

function* gitRepoSaga() {
  yield all([
    takeLatest(FETCH_GITREPO_REQUEST, fetchGitRepo),
    takeLatest(REPOUPDATE_REQUEST, repoUpdateSaga),
    takeLatest(FETCH_REPOS_REQUEST, getReposSaga),
    takeLatest(REMOVE_REPO_REQUEST, removeRepoSaga),
    takeLatest(FETCH_USERREPO_REQUEST, fetchUserRepoSaga)
  ]);
}

export default gitRepoSaga;
