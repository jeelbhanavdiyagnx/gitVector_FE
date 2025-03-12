import { all, call, put, takeLatest } from 'redux-saga/effects';
import appConfig from '@/components/utils/appConfig';

// Action Imports
import {
  REPO_OVERVIEW_REQUEST,
  REPO_OVERVIEW_SUCCESS,
  REPO_OVERVIEW_FAILURE,
  REPO_CONTRIBUTION_HEATMAP_REQUEST,
  REPO_CONTRIBUTION_HEATMAP_SUCCESS,
  REPO_CONTRIBUTION_HEATMAP_FAILURE,
  REPO_USER_PERFORMANCE_REQUEST,
  REPO_USER_PERFORMANCE_SUCCESS,
  REPO_USER_PERFORMANCE_FAILURE,
  REPO_COMMIT_FREQUENCY_REQUEST,
  REPO_COMMIT_FREQUENCY_SUCCESS,
  REPO_COMMIT_FREQUENCY_FAILURE,
  REPO_USER_PARTICIPATION_REQUEST,
  REPO_USER_PARTICIPATION_SUCCESS,
  REPO_USER_PARTICIPATION_FAILURE,
  REPO_CLASSIFICATION_CHART_REQUEST,
  REPO_CLASSIFICATION_CHART_SUCCESS,
  REPO_CLASSIFICATION_CHART_FAILURE,
  REPO_USER_PERFORMANCE_CHART_REQUEST,
  REPO_USER_PERFORMANCE_CHART_SUCCESS,
  REPO_USER_PERFORMANCE_CHART_FAILURE,
  REPO_ACTIVITY_REQUEST,
  REPO_ACTIVITY_SUCCESS,
  REPO_ACTIVITY_FAILURE,
  REPO_USERCOMMITPERFORMANCE_REQUEST,
  repoUserCommitPerformanceSuccess,
  repoUserCommitPerformanceFailure,
  REPO_USERCOMMITPERFORMANCE_SUCCESS,
  COMMIT_TYPE_SCORE_ANALAYSIS_SUCCESS,
  COMMIT_TYPE_SCORE_ANALAYSIS_FAILURE,
  COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST,
  REPO_TOTALCOMMITS_ANALYSIS_REQUEST,
  REPO_TOTALCOMMITS_ANALYSIS_SUCCESS,
  REPO_TOTALCOMMITS_ANALYSIS_FAILURE
} from '../actions/repoDashboardAction';

const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch data');
  }
  return response.json();
};

// Saga for fetching repository overview
function* getRepoOverviewSaga(action) {
  const { repo, dateRange } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const url = dateRange
      ? `${appConfig.getRepoOverview(repo)}?since=${dateRange.from}&until=${
          dateRange.to
        }`
      : appConfig.getRepoOverview(repo);
    const response = yield call(fetchApi, url, options);
    yield put({ type: REPO_OVERVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: REPO_OVERVIEW_FAILURE, payload: error.message });
  }
}

// Saga for fetching contribution heatmap
function* getContributionHeatmapSaga(action) {
  const { repo } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const url = appConfig.getRepoHeatMap(repo);
    const response = yield call(fetchApi, url, options);
    yield put({
      type: REPO_CONTRIBUTION_HEATMAP_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: REPO_CONTRIBUTION_HEATMAP_FAILURE,
      payload: error.message
    });
  }
}

// Saga for fetching user performance chart
function* getUserPerformanceChartSaga(action) {
  const { repo, dateRange } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
     const url = (() => {
      let baseUrl = appConfig.getRepoUserPerformanceChart(repo);

      // Check if there are any query parameters to add
      if (dateRange) {
        baseUrl += '?';
        const params = [];

        if (dateRange) {
          params.push(`since=${dateRange.from}&until=${dateRange.to}`);
        };

        // Join all parameters with '&' and append to the base URL
        baseUrl += params.join('&');
      }

      return baseUrl;
    })();
   
    const response = yield call(fetchApi, url, options);
    yield put({
      type: REPO_USER_PERFORMANCE_CHART_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: REPO_USER_PERFORMANCE_CHART_FAILURE,
      payload: error.message
    });
  }
}

// Saga for fetching user performance
function* getUserPerformanceSaga(action) {
  const { repo, dateRange, user } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    let url = appConfig.getRepoUserPerformance(repo);

    if (dateRange && dateRange.from && dateRange.to) {
      url += `?since=${dateRange.from}&until=${dateRange.to}`;
    }

    if (user) {
      url += url.includes('?') ? `&user=${user}` : `?user=${user}`;
    }
    const response = yield call(fetchApi, url, options);
    yield put({ type: REPO_USER_PERFORMANCE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: REPO_USER_PERFORMANCE_FAILURE, payload: error.message });
  }
}

// Saga for fetching commit frequency chart
function* getCommitFrequencyChartSaga(action) {
  const { repo, dateRange, timeframe } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const url = dateRange
      ? `${appConfig.getCommitFrequencyChart(repo)}?since=${
          dateRange.from
        }&until=${dateRange.to}&timeframe=${timeframe}`
      : appConfig.getCommitFrequencyChart(repo);
    const response = yield call(fetchApi, url, options);
    yield put({ type: REPO_COMMIT_FREQUENCY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: REPO_COMMIT_FREQUENCY_FAILURE, payload: error.message });
  }
}

// Saga for fetching user participation ratio
function* getUserParticipationRatioSaga(action) {
  const { repo, dateRange } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const url = dateRange
      ? `${appConfig.getUserParticipationRatio(repo)}?since=${
          dateRange.from
        }&until=${dateRange.to}`
      : `${appConfig.getUserParticipationRatio(repo)}`;
    const response = yield call(fetchApi, url, options);
    yield put({
      type: REPO_USER_PARTICIPATION_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: REPO_USER_PARTICIPATION_FAILURE,
      payload: error.message
    });
  }
}

// Saga for fetching repository classification chart
function* getClassificationChartSaga(action) {
  const { repo, dateRange, timeframe } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const url = (() => {
      let baseUrl = appConfig.getRepoClassificationChart(repo);

      // Check if there are any query parameters to add
      if ( timeframe || dateRange) {
        baseUrl += '?';
        const params = [];

        if (dateRange) {
          params.push(`since=${dateRange.from}&until=${dateRange.to}`);
        }
        if (timeframe) params.push(`timeframe=${timeframe}`);

        // Join all parameters with '&' and append to the base URL
        baseUrl += params.join('&');
      }

      return baseUrl;
    })();

    const response = yield call(fetchApi, url, options);
    yield put({
      type: REPO_CLASSIFICATION_CHART_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: REPO_CLASSIFICATION_CHART_FAILURE,
      payload: error.message
    });
  }
}

function* getRepoActivitySaga(action) {
  const { repo, type, sort, dateRange } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
    const url = (() => {
      let baseUrl = appConfig.getRepoActivity(repo);

      // Check if there are any query parameters to add
      if (type || sort || dateRange) {
        baseUrl += '?';
        const params = [];

        if (type) params.push(`type=${type}`);
        if (sort) params.push(`sort=final_score:${sort}`);
        if (dateRange) {
          params.push(`since=${dateRange.from}&until=${dateRange.to}`);
        }

        // Join all parameters with '&' and append to the base URL
        baseUrl += params.join('&');
      }

      return baseUrl;
    })();
    const response = yield call(fetchApi, url, options);
    yield put({ type: REPO_ACTIVITY_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: REPO_ACTIVITY_FAILURE, payload: error.message });
  }
}
function* getUserCommitPeformance(action) {
  const {repo, dateRange,skip,limit} = action.payload;
  
  try{
    const options = {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
  const url = dateRange
  ? `${appConfig.commitTable(repo)}?since=${dateRange.from}&until=${
     dateRange.to
    }&skip=${skip}&limit=${limit}`
  : `${appConfig.commitTable(repo)}?skip=${skip}&limit=${limit}`;
  
  const response = yield call(fetchApi,url,options)
  if (response.status === 200) {
    yield put({type: REPO_USERCOMMITPERFORMANCE_SUCCESS, payload: response.data});
    
  }

} catch (error) {
console.error('Error fetching commits:', error);
yield put(repoUserCommitPerformanceFailure(error))
}
}

function* getCommitTypeScoreAnalysisSaga(action) {
  const { repo, dateRange , type} = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  try {
     const url = (() => {
      let baseUrl = appConfig.getUserParticipationRatio(repo);

      // Check if there are any query parameters to add
      if (type  || dateRange) {
        baseUrl += '?';
        const params = [];

        if (dateRange) {
          params.push(`since=${dateRange.from}&until=${dateRange.to}`);
        }
        if (type) params.push(`type=${type}`);

        // Join all parameters with '&' and append to the base URL
        baseUrl += params.join('&');
      }

      return baseUrl;
    })();
    const response = yield call(fetchApi, url, options);
    yield put({
      type: COMMIT_TYPE_SCORE_ANALAYSIS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: COMMIT_TYPE_SCORE_ANALAYSIS_FAILURE,
      payload: error.message
    });
  }
}
function* getRepoTotalCommitsAnalysisSaga(action) {
  const {repoId} = action.payload;
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.log(repoId, "saga");
    
    const response = yield call(fetchApi, appConfig.getRepoTotalCommits(repoId), options);
    yield put({type: REPO_TOTALCOMMITS_ANALYSIS_SUCCESS, payload: response.data})
  } catch (error) {
    yield put({type: REPO_TOTALCOMMITS_ANALYSIS_FAILURE, payload: error.message})
  }
}
// Watcher saga
function* repoDashboardSaga() {
  yield all([
    takeLatest(REPO_OVERVIEW_REQUEST, getRepoOverviewSaga),
    takeLatest(REPO_CONTRIBUTION_HEATMAP_REQUEST, getContributionHeatmapSaga),
    takeLatest(REPO_USER_PERFORMANCE_REQUEST, getUserPerformanceSaga),
    takeLatest(
      REPO_USER_PERFORMANCE_CHART_REQUEST,
      getUserPerformanceChartSaga
    ),
    takeLatest(REPO_COMMIT_FREQUENCY_REQUEST, getCommitFrequencyChartSaga),
    takeLatest(REPO_USER_PARTICIPATION_REQUEST, getUserParticipationRatioSaga),
    takeLatest(REPO_CLASSIFICATION_CHART_REQUEST, getClassificationChartSaga),
    takeLatest(REPO_ACTIVITY_REQUEST, getRepoActivitySaga),
    takeLatest(REPO_USERCOMMITPERFORMANCE_REQUEST, getUserCommitPeformance),
    takeLatest(COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST, getCommitTypeScoreAnalysisSaga),
    takeLatest(REPO_TOTALCOMMITS_ANALYSIS_REQUEST, getRepoTotalCommitsAnalysisSaga),
  ]);
}

export default repoDashboardSaga;
