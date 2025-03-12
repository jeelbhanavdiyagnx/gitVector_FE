export const USEROVERVIEW_REQUEST = 'USEROVERVIEW_REQUEST';
export const USEROVERVIEW_SUCCESS = 'USEROVERVIEW_SUCCESS';
export const USEROVERVIEW_FAILURE = 'USEROVERVIEW_FAILURE';
export const USERCLASSIFICATIONCHART_REQUEST = 'USERCLASSIFICATIONCHART_REQUEST';
export const USERCLASSIFICATIONCHART_SUCCESS = 'USERCLASSIFICATIONCHART_SUCCESS';
export const USERCLASSIFICATIONCHART_FAILURE = 'USERCLASSIFICATIONCHART_FAILURE';
export const USERCOMPARISONCHART_REQUEST = 'USERCOMPARISONCHART_REQUEST';
export const USERCOMPARISONCHART_SUCCESS = 'USERCOMPARISONCHART_SUCCESS';
export const USERCOMPARISONCHART_FAILURE = 'USERCOMPARISONCHART_FAILURE';
export const USERHEATMAP_REQUEST = "USERHEATMAP_REQUEST";
export const USERHEATMAP_SUCCESS = "USERHEATMAP_SUCCESS";
export const USERHEATMAP_FAILURE = "USERHEATMAP_FAILURE";
export const REPOLEVELPERFORMANCE_REQUEST = "REPOLEVELPERFORMANCE_REQUEST";
export const REPOLEVELPERFORMANCE_SUCCESS = "REPOLEVELPERFORMANCE_SUCCESS";
export const REPOLEVELPERFORMANCE_FAILURE = "REPOLEVELPERFORMANCE_FAILURE";
export const CODEQUALITYCHART_REQUEST = "CODEQUALITYCHART_REQUEST";
export const CODEQUALITYCHART_SUCCESS = "CODEQUALITYCHART_SUCCESS";
export const CODEQUALITYCHART_FAILURE = "CODEQUALITYCHART_FAILURE";
export const REPOPARTICIPATION_REQUEST = "REPOPARTICIPATION_REQUEST";
export const REPOPARTICIPATION_SUCCESS = "REPOPARTICIPATION_SUCCESS";
export const REPOPARTICIPATION_FAILURE = "REPOPARTICIPATION_FAILURE";
export const RESET_USERCOMPARISONCHART = "RESET_USERCOMPARISONCHART";
export const RESET_REPOLEVELPERFORMANCE = "RESET_REPOLEVELPERFORMANCE";
export const RESET_USERCLASSIFICATIONCHART = "RESET_USERCLASSIFICATIONCHART";
export const USERACTIVITY_REQUEST = "USERACTIVITY_REQUEST";
export const USERACTIVITY_SUCCESS = "USERACTIVITY_SUCCESS";
export const USERACTIVITY_FAILURE = "USERACTIVITY_FAILURE";
export const USERALERT_REQUEST = "USERALERT_REQUEST";
export const USERALERT_SUCCESS = "USERALERT_SUCCESS";
export const USERALERT_FAILURE = "USERALERT_FAILURE";
export const RESET_USER = "RESET_USER";
export const USER_REPOCOMMITPERFORMANCE_REQUEST = "USER_REPOCOMMITPERFORMANCE_REQUEST";
export const USER_REPOCOMMITPERFORMANCE_SUCCESS = "USER_REPOCOMMITPERFORMANCE_SUCCESS";
export const USER_REPOCOMMITPERFORMANCE_FAILURE = "USER_REPOCOMMITPERFORMANCE_FAILURE";

export const USER_COMMIT_FREQUENCY_REQUEST = "USER_COMMIT_FREQUENCY_REQUEST";
export const USER_COMMIT_FREQUENCY_SUCCESS = "USER_COMMIT_FREQUENCY_SUCCESS";
export const USER_COMMIT_FREQUENCY_FAILURE = "USER_COMMIT_FREQUENCY_FAILURE";

export const USER_COMMIT_TYPE_SCORE_REQUEST = "USER_COMMIT_TYPE_SCORE_REQUEST";
export const USER_COMMIT_TYPE_SCORE_SUCCESS = "USER_COMMIT_TYPE_SCORE_SUCCESS";
export const USER_COMMIT_TYPE_SCORE_FAILURE = "USER_COMMIT_TYPE_SCORE_FAILURE";

export const userHeatMapRequest = (user) => ({
    type: USERHEATMAP_REQUEST,
    payload: {user}
})
export const userHeartMapSuccess = (response) => ({
    type: USERHEATMAP_SUCCESS,
    payload: response
})
export const userHeatMapFailure = (error)=>({
    type:USERHEATMAP_FAILURE,
    payload:error
})

export const userOverviewRequest = (user,dateRange) => ({
    type: USEROVERVIEW_REQUEST,
    payload: { user,dateRange }
});

export const userOverviewSuccess = (response) => ({
    type: USEROVERVIEW_SUCCESS,
    payload: response,
});

export const userOverviewFailure = (error) => ({
    type: USEROVERVIEW_FAILURE,
    payload: error
})
export const userClassificationChartRequest = (user,dateRange) => ({
    type: USERCLASSIFICATIONCHART_REQUEST,
    payload: { user,dateRange }
});

export const userClassificationChartSuccess = (response) => ({
    type: USERCLASSIFICATIONCHART_SUCCESS,
    payload: response,
});

export const userClassificationChartFailure = (error) => ({
    type: USERCLASSIFICATIONCHART_FAILURE,
    payload: error
})
export const userComparisonChartRequest = (user1, user2, metricForCompare,compDateRange) => ({
    type: USERCOMPARISONCHART_REQUEST,
    payload: { user1, user2, metricForCompare ,compDateRange}
});

export const userComparisonChartSuccess = (response) => ({
    type: USERCOMPARISONCHART_SUCCESS,
    payload: response,
});

export const userComparisonChartFailure = (error) => ({
    type: USERCOMPARISONCHART_FAILURE,
    payload: error
});
export const repoLevelPeformanceRequest = (user,repo , dateRange) => ({
    type: REPOLEVELPERFORMANCE_REQUEST,
    payload: { user, repo, dateRange }
});

export const repoLevelPeformanceSuccess = (response) => ({
    type: REPOLEVELPERFORMANCE_SUCCESS,
    payload: response,
});

export const repoLevelPeformanceFailure = (error) => ({
    type: REPOLEVELPERFORMANCE_FAILURE,
    payload: error
});

export const codeQualityChartRequest = (user,dateRange ) => ({
    type: CODEQUALITYCHART_REQUEST,
    payload: { user,dateRange }
});

export const codeQualityChartSuccess = (response) => ({
    type: CODEQUALITYCHART_SUCCESS,
    payload: response,
});

export const codeQualityChartFailure = (error) => ({
    type: CODEQUALITYCHART_FAILURE,
    payload: error
});
export const repoParticipationRequest = (user,dateRange ) => ({
    type: REPOPARTICIPATION_REQUEST,
    payload: { user, dateRange }
});

export const repoParticipationSuccess = (response) => ({
    type: REPOPARTICIPATION_SUCCESS,
    payload: response,
});

export const repoParticipationFailure = (error) => ({
    type: REPOPARTICIPATION_FAILURE,
    payload: error
});

export const resetRepoLevelPerformance = () => ({
    type: RESET_REPOLEVELPERFORMANCE
})

export const resetUserComparisonChart = () => ({
    type: RESET_USERCOMPARISONCHART
});

export const resetUserClassificationChart = () => ({
    type: RESET_USERCLASSIFICATIONCHART
});

export const userActivityRequest = (user,type, sort, dateRange) => ({
    type: USERACTIVITY_REQUEST,
    payload: { user,type, sort, dateRange }
});

export const userActivitySuccess = (response) => ({
    type: USERACTIVITY_SUCCESS,
    payload: response,
});

export const userActivityFailure = (error) => ({
    type: USERACTIVITY_FAILURE,
    payload: error
});

export const userAlertRequest = (user,dateRange) => ({
    type: USERALERT_REQUEST,
    payload: { user,dateRange }
});

export const userAlertSuccess = (response) => ({
    type: USERALERT_SUCCESS,
    payload: response,
});

export const userAlertFailure = (error) => ({
    type: USERALERT_FAILURE,
    payload: error
});

export const resetUserRequest = () => ({
    type: RESET_USER
});

export const userRepoCommitPerformanceRequest = (user, dateRange, skip, limit) => ({
  type: USER_REPOCOMMITPERFORMANCE_REQUEST,
  payload: { user, dateRange,skip, limit },
});

export const userRepoCommitPerformanceSuccess = (response) => ({
  type: USER_REPOCOMMITPERFORMANCE_SUCCESS,
  payload: response,
});

export const userRepoCommitPerformanceFailure = (error) => ({
  type: USER_REPOCOMMITPERFORMANCE_FAILURE,
  payload: error,
});

export const userCommitFrequencyRequest = (repo, dateRange) => ({
  type: USER_COMMIT_FREQUENCY_REQUEST,
  payload: { repo, dateRange },
});

export const userCommitTypeScoreRequest = (user,type, dateRange) => ({
    type: USER_COMMIT_TYPE_SCORE_REQUEST,
    payload: { user, type , dateRange},
});