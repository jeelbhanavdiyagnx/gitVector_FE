export const ORGOVERVIEW_REQUEST = 'ORGOVERVIEW_REQUEST';
export const ORGOVERVIEW_SUCCESS = 'ORGOVERVIEW_SUCCESS';
export const ORGOVERVIEW_FAILURE = 'ORGOVERVIEW_FAILURE';
export const USERPERFORMANCECHART_REQUEST = 'USERPERFORMANCECHART_REQUEST';
export const USERPERFORMANCECHART_SUCCESS = 'USERPERFORMANCECHART_SUCCESS';
export const USERPERFORMANCECHART_FAILURE = 'USERPERFORMANCECHART_FAILURE';
export const REPOAVGSCORECHART_REQUEST = 'REPOAVGSCORECHART_REQUEST';
export const REPOAVGSCORECHART_SUCCESS = 'REPOAVGSCORECHART_SUCCESS';
export const REPOAVGSCORECHART_FAILURE = 'REPOAVGSCORECHART_FAILURE';
export const ORGHEATMAP_REQUEST = "ORGHEATMAP_REQUEST";
export const ORGHEATMAP_SUCCESS = "ORGHEATMAP_SUCCESS";
export const ORGHEATMAP_FAILURE = "ORGHEATMAP_FAILURE";
export const ORGACTIVITY_REQUEST = "ORGACTIVITY_REQUEST";
export const ORGACTIVITY_SUCCESS = "ORGACTIVITY_SUCCESS";
export const ORGACTIVITY_FAILURE = "ORGACTIVITY_FAILURE";
export const ORGALERTS_REQUEST = "ORGALERTS_REQUEST";
export const ORGALERTS_SUCCESS = "ORGALERTS_SUCCESS";
export const ORGALERTS_FAILURE = "ORGALERTS_FAILURE";

export const ORG_TOTALCOMMITS_ANALYSIS_REQUEST = "ORG_TOTALCOMMITS_ANALYSIS_REQUEST";
export const ORG_TOTALCOMMITS_ANALYSIS_SUCCESS = "ORG_TOTALCOMMITS_ANALYSIS_SUCCESS";
export const ORG_TOTALCOMMITS_ANALYSIS_FAILURE = "ORG_TOTALCOMMITS_ANALYSIS_FAILURE";

export const RESET_ORG = "RESET_ORG"


export const orgHeatMapRequest = (org) => ({
    type: ORGHEATMAP_REQUEST,
    payload: {org}
})
export const orgHeartMapSuccess = (response) => ({
    type: ORGHEATMAP_SUCCESS,
    payload: response
})
export const orgHeatMapFailure = (error)=>({
    type:ORGHEATMAP_FAILURE,
    payload:error
})
export const orgOverviewRequest = (org, dateRange) => ({
    type: ORGOVERVIEW_REQUEST,
    payload: { org, dateRange }
});

export const orgOverviewSuccess = (response) => ({
    type: ORGOVERVIEW_SUCCESS,
    payload: response,
});

export const orgOverviewFailure = (error) => ({
    type: ORGOVERVIEW_FAILURE,
    payload: error
})
export const userPerformanceChartRequest = (org, dateRange) => ({
    type: USERPERFORMANCECHART_REQUEST,
    payload: { org, dateRange }
});

export const userPerformanceChartSuccess = (response) => ({
    type: USERPERFORMANCECHART_SUCCESS,
    payload: response,
});

export const userPerformanceChartFailure = (error) => ({
    type: USERPERFORMANCECHART_FAILURE,
    payload: error
})
export const repoAvgScoreChartRequest = (org, dateRange) => ({
    type: REPOAVGSCORECHART_REQUEST,
    payload: { org, dateRange }
});

export const repoAvgScoreChartSuccess = (response) => ({
    type: REPOAVGSCORECHART_SUCCESS,
    payload: response,
});

export const repoAvgScoreChartFailure = (error) => ({
    type: REPOAVGSCORECHART_FAILURE,
    payload: error
});

export const orgActivityRequest = (org,type, sort, dateRange) => ({
    type: ORGACTIVITY_REQUEST,
    payload: { org,type, sort, dateRange }
});

export const orgActivitySuccess = (response) => ({
    type: ORGACTIVITY_SUCCESS,
    payload: response,
});

export const orgActivityFailure = (error) => ({
    type: ORGACTIVITY_FAILURE,
    payload: error
});

export const orgAlertsRequest = (org,dateRange) => ({
    type: ORGALERTS_REQUEST,
    payload: { org , dateRange}
});

export const orgAlertsSuccess = (response) => ({
    type: ORGALERTS_SUCCESS,
    payload: response,
});

export const orgAlertsFailure = (error) => ({
    type: ORGALERTS_FAILURE,
    payload: error
});

export const resetOrgRequest = () => ({
    type: RESET_ORG
});

export const orgTotalCommitAnalysisRequest = (orgId) => ({
  type: ORG_TOTALCOMMITS_ANALYSIS_REQUEST,
  payload: {orgId},
})
