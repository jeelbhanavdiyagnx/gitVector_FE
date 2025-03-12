import appConfig from "@/components/utils/appConfig";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { ORG_TOTALCOMMITS_ANALYSIS_FAILURE, ORG_TOTALCOMMITS_ANALYSIS_REQUEST, ORG_TOTALCOMMITS_ANALYSIS_SUCCESS, ORGACTIVITY_REQUEST, orgActivityFailure, orgActivitySuccess, ORGALERTS_REQUEST, orgAlertsFailure, orgAlertsSuccess, orgHeartMapSuccess, ORGHEATMAP_REQUEST, orgHeatMapFailure, ORGOVERVIEW_REQUEST, orgOverviewFailure, orgOverviewSuccess, REPOAVGSCORECHART_REQUEST, repoAvgScoreChartFailure, repoAvgScoreChartSuccess, resetOrgDashboardState, USERPERFORMANCECHART_REQUEST, userPerformanceChartFailure, userPerformanceChartSuccess } from "../actions/orgDashboardAction";

const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch data');
  }
  return response.json();
};

function* getOrgOverviewSaga(action) {
  const { org, dateRange } = action.payload;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  try {
    const url = dateRange ? `${appConfig.getOrgOverview(org)}?since=${dateRange.from}&until=${dateRange.to}` : appConfig.getOrgOverview(org)
    const overviewResponse = yield call(fetchApi, url, options);
    yield put(orgOverviewSuccess(overviewResponse.data));
  } catch (error) {
    yield put(orgOverviewFailure(error));
  }
}

function* getUserPerformanceSaga(action) {
  const { org, dateRange } = action.payload;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  try {
    const url = dateRange ? `${appConfig.getOrgUserPerformanceChart(org)}?since=${dateRange.from}&until=${dateRange.to}` : appConfig.getOrgUserPerformanceChart(org)
    const userPerformanceResponse = yield call(fetchApi, url, options);
    yield put(userPerformanceChartSuccess(userPerformanceResponse.data));
  } catch (error) {
    yield put(userPerformanceChartFailure(error));
  }

}

function* getRepoScoreSaga(action) {
  const { org, dateRange } = action.payload;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  try {
    const url = dateRange ? `${appConfig.getOrgRepoAvgScoreChart(org)}?since=${dateRange.from}&until=${dateRange.to}` : appConfig.getOrgRepoAvgScoreChart(org)
    const repoAvgScoreChartResponse = yield call(fetchApi, url, options);
    yield put(repoAvgScoreChartSuccess(repoAvgScoreChartResponse.data));
  } catch (error) {
    yield put(repoAvgScoreChartFailure(error));
  }

}
function* getOrgHeatMapSaga(action) {
  const { org } = action.payload;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  try {
    const url = `${appConfig.getOrgHeatMap(org)}`
    const response = yield call(fetchApi, url, options);
    yield put(orgHeartMapSuccess(response.data))
  } catch (error) {
    yield put(orgHeatMapFailure(error));
  }
}

function* getOrgActivitySaga(action) {
  const { org,type, sort, dateRange } = action.payload;

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
        url = `${appConfig.getOrgActivity(org)}?type=${type}&sort=final_score:${sort}&since=${dateRange.from}&until=${dateRange.to}`
      }
      else if (type) {
        url = `${appConfig.getOrgActivity(org)}?type=${type}&since=${dateRange.from}&until=${dateRange.to}`
      }
      else if (sort){
        url = `${appConfig.getOrgActivity(org)}?sort=final_score:${sort}&since=${dateRange.from}&until=${dateRange.to}`
      }
      else{
        url = `${appConfig.getOrgActivity(org)}?since=${dateRange.from}&until=${dateRange.to}`
      }
    }
    else if (type) {
      if (sort) {
        url = `${appConfig.getOrgActivity(org)}?type=${type}&sort=final_score:${sort}`        
      }
      else {
        url = `${appConfig.getOrgActivity(org)}?type=${type}`
      }
    }
    else if (sort) {
      url = `${appConfig.getOrgActivity(org)}?sort=final_score:${sort}`
    }
    else{
      url = `${appConfig.getOrgActivity(org)}`
    }
    const response = yield call(fetchApi, url, options);
    yield put(orgActivitySuccess(response.data));
  } catch (error) {
    yield put(orgActivityFailure(error));
  }
}
function* getOrgAlertSaga (action) {
  const {org,dateRange} = action.payload;
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const url = dateRange ? `${appConfig?.getOrgAlerts(org)}&since=${dateRange.from}&until=${dateRange.to}` : appConfig.getOrgAlerts(org);
    const response = yield call(fetchApi, url, options);
    yield put(orgAlertsSuccess(response.data))
  } catch (error) {
    yield put(orgAlertsFailure(error));
    console.log(error)
  }
} 
function* getOrgTotalCommitsAnalysisSaga(action) {
  const {orgId} = action.payload;
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };    
    const response = yield call(fetchApi, appConfig.getRepoTotalCommits(orgId), options);
    yield put({type: ORG_TOTALCOMMITS_ANALYSIS_SUCCESS, payload: response.data})
  } catch (error) {
    yield put({type: ORG_TOTALCOMMITS_ANALYSIS_FAILURE, payload: error.message})
  }
}
function* orgDashboardSaga() {
  yield all([
    takeLatest(ORGOVERVIEW_REQUEST, getOrgOverviewSaga),
    takeLatest(USERPERFORMANCECHART_REQUEST, getUserPerformanceSaga),
    takeLatest(REPOAVGSCORECHART_REQUEST, getRepoScoreSaga),
    takeLatest(ORGHEATMAP_REQUEST, getOrgHeatMapSaga),
    takeLatest(ORGACTIVITY_REQUEST, getOrgActivitySaga),
    takeLatest(ORGALERTS_REQUEST, getOrgAlertSaga),
    takeLatest(ORG_TOTALCOMMITS_ANALYSIS_REQUEST, getOrgTotalCommitsAnalysisSaga)
  ]);
}

export default orgDashboardSaga;