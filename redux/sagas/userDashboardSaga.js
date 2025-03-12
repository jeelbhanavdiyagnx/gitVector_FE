import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CODEQUALITYCHART_REQUEST,
    codeQualityChartFailure,
    codeQualityChartSuccess,
    repoLevelPeformanceFailure,
    repoLevelPeformanceSuccess,
    REPOLEVELPERFORMANCE_REQUEST,
    REPOPARTICIPATION_REQUEST,
    repoParticipationFailure,
    repoParticipationSuccess,
    USER_COMMIT_FREQUENCY_FAILURE,
    USER_COMMIT_FREQUENCY_REQUEST,
    USER_COMMIT_FREQUENCY_SUCCESS,
    USER_COMMIT_TYPE_SCORE_FAILURE,
    USER_COMMIT_TYPE_SCORE_REQUEST,
    USER_COMMIT_TYPE_SCORE_SUCCESS,
    USER_REPOCOMMITPERFORMANCE_REQUEST,
    USER_REPOCOMMITPERFORMANCE_SUCCESS,
    USERACTIVITY_REQUEST,
    userActivityFailure,
    userActivitySuccess,
    USERALERT_REQUEST,
    userAlertFailure,
    userAlertSuccess,
    USERCLASSIFICATIONCHART_REQUEST,
    userClassificationChartFailure,
    userClassificationChartSuccess,
    USERCOMPARISONCHART_REQUEST,
    userComparisonChartFailure,
    userComparisonChartSuccess,
    userHeartMapSuccess,
    USERHEATMAP_REQUEST,
  userHeatMapFailure,
  USEROVERVIEW_REQUEST,
  userOverviewFailure,
  userOverviewSuccess,
  userRepoCommitPerformanceFailure
} from '../actions/userDashboardAction';
import appConfig from '@/components/utils/appConfig';

const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch data');
  }
  return response.json();
};

function* getUserOverviewSaga(action) {
  const {user,dateRange} = action.payload;
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
const url = dateRange ? `${appConfig.getUserOverview(user)}?since=${dateRange?.from}&until=${dateRange?.to}` : appConfig.getUserOverview(user)
    const response = yield call(fetchApi, url, options);
    yield put(userOverviewSuccess(response.data));
  } catch (error) {
    yield put(userOverviewFailure(error));
  }
}
function* getUserHeatmapSaga(action) {
    const {user} = action.payload
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };     
  
      const response = yield call(fetchApi, appConfig.getUserHeatMap(user), options);
      
      yield put(userHeartMapSuccess(response.data));
    } catch (error) {
      yield put(userHeatMapFailure(error));
    }
  }
  function* userComparisonSaga(action) {
    const {user1, user2, metricForCompare,compDateRange} = action.payload
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }; 
        
      const url = compDateRange ? `${appConfig.getUserComparisonChart(user1,user2)}&since=${compDateRange?.from}&until=${compDateRange?.to}&timeframe=monthly&type=${metricForCompare}` : `${appConfig.getUserComparisonChart(user1,user2)}&?since=2024-12-01&until=2025-01-07&timeframe=monthly&type=${metricForCompare}`;
  
      const response = yield call(fetchApi, url, options);
            
      yield put(userComparisonChartSuccess(response.data));
    } catch (error) {
      yield put(userComparisonChartFailure(error));
    }
  }
  function* userClassificationChartSaga(action) {
    const {user,dateRange} = action.payload
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }; 
      const url = dateRange ? `${appConfig.getUserClassificationChart(user)}?since=${dateRange.from}&until=${dateRange.to}` : appConfig.getUserClassificationChart(user)
      const response = yield call(fetchApi, url, options);
      
      yield put(userClassificationChartSuccess(response.data));
    } catch (error) {
      yield put(userClassificationChartFailure(error));
    }
  }
  function* repoLevelPerformanceSaga(action) {
    const {user, repo,dateRange} = action.payload
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }; 
      const url = dateRange ? `${appConfig.getUserRepoLevelPerformance(user,repo)}&since=${dateRange?.from}&until=${dateRange?.to}` : appConfig.getUserRepoLevelPerformance(user,repo)
      const response = yield call(fetchApi, url, options);
      
      yield put(repoLevelPeformanceSuccess(response.data));
    } catch (error) {
      yield put(repoLevelPeformanceFailure(error));
    }
  }
  function* codeQualityChartSaga(action) {
    const {user,dateRange} = action.payload
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }; 
      const url = dateRange ? `${appConfig.getUserCodeQualityChart(user)}?since=${dateRange?.from}&until=${dateRange?.to}` : appConfig.getUserCodeQualityChart(user)
      const response = yield call(fetchApi, url, options);
      
      yield put(codeQualityChartSuccess(response.data));
    } catch (error) {
      yield put(codeQualityChartFailure(error));
    }
  }
  function* repoParticipationSaga(action) {
    const {user,dateRange} = action.payload
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }; 
      const url = dateRange ? `${appConfig.getUserRepoParticipation(user)}?since=${dateRange?.from}&until=${dateRange?.to}` : appConfig.getUserRepoParticipation(user)
      const response = yield call(fetchApi, url, options);
      
      yield put(repoParticipationSuccess(response.data));
    } catch (error) {
      yield put(repoParticipationFailure(error));
    }
  }

  function* userActivitySaga(action) {
    const { user,type, sort, dateRange } = action.payload;
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  
    try {
      let url;
      if (dateRange) {
        if (type && sort) {
          url = `${appConfig.getUserActivity(user)}?type=${type}&sort=${sort}&since=${dateRange.from}&until=${dateRange.to}`
        }
        else if (type) {
          url = `${appConfig.getUserActivity(user)}?type=${type}&since=${dateRange.from}&until=${dateRange.to}`
        }
        else if (sort){
          url = `${appConfig.getUserActivity(user)}?sort=${sort}&since=${dateRange.from}&until=${dateRange.to}`
        }
        else{
          url = `${appConfig.getUserActivity(user)}?since=${dateRange.from}&until=${dateRange.to}`
        }
      }
      else if (type) {
        if (sort) {
          url = `${appConfig.getUserActivity(user)}?type=${type}&sort=final_score:${sort}`        
        }
        else {
          url = `${appConfig.getUserActivity(user)}?type=${type}`
        }
      }
      else if (sort) {
        url = `${appConfig.getUserActivity(user)}?sort=final_score:${sort}`
      }
      else{
        url = `${appConfig.getUserActivity(user)}`
      }
      const response = yield call(fetchApi, url, options);
      yield put(userActivitySuccess(response.data));
    } catch (error) {
      yield put(userActivityFailure(error));
      console.log(error)
    }
  }

  function* userAlertSaga (action) {
    const {user,dateRange} = action.payload;
    try {      
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      const url = dateRange ? `${appConfig.getUserAlerts(user)}&since=${dateRange.from}&until=${dateRange.to}` : appConfig.getUserAlerts(user)
      const response = yield call(fetchApi, url, options);
      yield put(userAlertSuccess(response.data))
    } catch (error) {
      yield put(userAlertFailure(error));
      console.log(error)
    }
  }
  function* getRepoCommitPeformance(action) {
    const {user, dateRange,skip,limit} = action.payload;
    
    try{
      const options = {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      }
    const url = dateRange
    ? `${appConfig.userCommitTable(user)}?since=${dateRange.from}&until=${
       dateRange.to
      }&skip=${skip}&limit=${limit}`
    : `${appConfig.userCommitTable(user)}?skip=${skip}&limit=${limit}`;
    
    const response = yield call(fetchApi,url,options)
    if (response.status === 200) {
      yield put({type: USER_REPOCOMMITPERFORMANCE_SUCCESS, payload: response.data});
      
    }
  
  } catch (error) {
  console.error('Error fetching commits:', error);
  yield put(userRepoCommitPerformanceFailure(error))
  }
  }

  function* getUserCommitFrequencyChartSaga(action) {
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
        ? `${appConfig.getUserCommitFrequencyChart(repo)}?since=${
            dateRange.from
          }&until=${dateRange.to}`
        : appConfig.getUserCommitFrequencyChart(repo);
      const response = yield call(fetchApi, url, options);
      yield put({ type: USER_COMMIT_FREQUENCY_SUCCESS, payload: response.data });
    } catch (error) {
      yield put({ type: USER_COMMIT_FREQUENCY_FAILURE, payload: error.message });
    }
  }
  function* getUserCommitTypeScoreSaga(action) {
    const { user, type , dateRange} = action.payload;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  
    try {
       const url = (() => {
        let baseUrl = appConfig.getUserRepoParticipation(user);
  
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
        type: USER_COMMIT_TYPE_SCORE_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      yield put({
        type: USER_COMMIT_TYPE_SCORE_FAILURE,
        payload: error.message
      });
    }
  }
function* userDashboardSaga() {
  yield all([
    takeLatest(USEROVERVIEW_REQUEST, getUserOverviewSaga),
    takeLatest(USERHEATMAP_REQUEST, getUserHeatmapSaga),
    takeLatest(USERCOMPARISONCHART_REQUEST, userComparisonSaga),
    takeLatest(USERCLASSIFICATIONCHART_REQUEST, userClassificationChartSaga),
    takeLatest(REPOLEVELPERFORMANCE_REQUEST, repoLevelPerformanceSaga),
    takeLatest(CODEQUALITYCHART_REQUEST, codeQualityChartSaga),
    takeLatest(REPOPARTICIPATION_REQUEST, repoParticipationSaga),
    takeLatest(USERACTIVITY_REQUEST, userActivitySaga),
    takeLatest(USERALERT_REQUEST, userAlertSaga),
    takeLatest(USER_REPOCOMMITPERFORMANCE_REQUEST,getRepoCommitPeformance),
    takeLatest(USER_COMMIT_FREQUENCY_REQUEST, getUserCommitFrequencyChartSaga),
    takeLatest(USER_COMMIT_TYPE_SCORE_REQUEST, getUserCommitTypeScoreSaga)
  ]);
}

export default userDashboardSaga;
