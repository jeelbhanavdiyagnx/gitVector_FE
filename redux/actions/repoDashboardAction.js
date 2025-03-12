export const REPO_OVERVIEW_REQUEST = "REPO_OVERVIEW_REQUEST";
export const REPO_OVERVIEW_SUCCESS = "REPO_OVERVIEW_SUCCESS";
export const REPO_OVERVIEW_FAILURE = "REPO_OVERVIEW_FAILURE";

export const REPO_CONTRIBUTION_HEATMAP_REQUEST = "REPO_CONTRIBUTION_HEATMAP_REQUEST";
export const REPO_CONTRIBUTION_HEATMAP_SUCCESS = "REPO_CONTRIBUTION_HEATMAP_SUCCESS";
export const REPO_CONTRIBUTION_HEATMAP_FAILURE = "REPO_CONTRIBUTION_HEATMAP_FAILURE";

export const REPO_USER_PERFORMANCE_CHART_REQUEST = "REPO_USER_PERFORMANCE_CHART_REQUEST";
export const REPO_USER_PERFORMANCE_CHART_SUCCESS = "REPO_USER_PERFORMANCE_CHART_SUCCESS";
export const REPO_USER_PERFORMANCE_CHART_FAILURE = "REPO_USER_PERFORMANCE_CHART_FAILURE";

export const REPO_USER_PERFORMANCE_REQUEST = "REPO_USER_PERFORMANCE_REQUEST";
export const REPO_USER_PERFORMANCE_SUCCESS = "REPO_USER_PERFORMANCE_SUCCESS";
export const REPO_USER_PERFORMANCE_FAILURE = "REPO_USER_PERFORMANCE_FAILURE"

export const REPO_COMMIT_FREQUENCY_REQUEST = "REPO_COMMIT_FREQUENCY_REQUEST";
export const REPO_COMMIT_FREQUENCY_SUCCESS = "REPO_COMMIT_FREQUENCY_SUCCESS";
export const REPO_COMMIT_FREQUENCY_FAILURE = "REPO_COMMIT_FREQUENCY_FAILURE";

export const REPO_USER_PARTICIPATION_REQUEST = "REPO_USER_PARTICIPATION_REQUEST";
export const REPO_USER_PARTICIPATION_SUCCESS = "REPO_USER_PARTICIPATION_SUCCESS";
export const REPO_USER_PARTICIPATION_FAILURE = "REPO_USER_PARTICIPATION_FAILURE";

export const REPO_CLASSIFICATION_CHART_REQUEST = "REPO_CLASSIFICATION_CHART_REQUEST";
export const REPO_CLASSIFICATION_CHART_SUCCESS = "REPO_CLASSIFICATION_CHART_SUCCESS";
export const REPO_CLASSIFICATION_CHART_FAILURE = "REPO_CLASSIFICATION_CHART_FAILURE";

export const REPO_ACTIVITY_REQUEST = "REPO_ACTIVITY_REQUEST";
export const REPO_ACTIVITY_SUCCESS = "REPO_ACTIVITY_SUCCESS";
export const REPO_ACTIVITY_FAILURE = "REPO_ACTIVITY_FAILURE";

export const RESET_REPOUSERPERFORMANCE = "RESET_REPOUSERPERFORMANCE";

export const REPO_USERCOMMITPERFORMANCE_REQUEST = "REPO_USERCOMMITPERFORMANCE_REQUEST";
export const REPO_USERCOMMITPERFORMANCE_SUCCESS = "REPO_USERCOMMITPERFORMANCE_SUCCESS";
export const REPO_USERCOMMITPERFORMANCE_FAILURE = "REPO_USERCOMMITPERFORMANCE_FAILURE";
export const RESET_REPO = "RESET_REPO"

export const COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST = "COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST";
export const COMMIT_TYPE_SCORE_ANALAYSIS_SUCCESS = "COMMIT_TYPE_SCORE_ANALAYSIS_SUCCESS";
export const COMMIT_TYPE_SCORE_ANALAYSIS_FAILURE = "COMMIT_TYPE_SCORE_ANALAYSIS_FAILURE";

export const REPO_TOTALCOMMITS_ANALYSIS_REQUEST = "REPO_TOTALCOMMITS_ANALYSIS_REQUEST";
export const REPO_TOTALCOMMITS_ANALYSIS_SUCCESS = "REPO_TOTALCOMMITS_ANALYSIS_SUCCESS";
export const REPO_TOTALCOMMITS_ANALYSIS_FAILURE = "REPO_TOTALCOMMITS_ANALYSIS_FAILURE";

// Action Creators
export const repoOverviewRequest = (repo, dateRange) => ({
  type: REPO_OVERVIEW_REQUEST,
  payload: { repo, dateRange },
});

export const repoContributionHeatmapRequest = (repo) => ({
  type: REPO_CONTRIBUTION_HEATMAP_REQUEST,
  payload: { repo },
});

export const repoUserPerformanceChartRequest = (repo, dateRange) => ({
  type: REPO_USER_PERFORMANCE_CHART_REQUEST,
  payload: { repo, dateRange },
});

export const repoUserPerformanceRequest = (repo, dateRange, user) => ({
  type: REPO_USER_PERFORMANCE_REQUEST,
  payload: { repo, dateRange, user },
});

export const repoCommitFrequencyRequest = (repo, dateRange, timeframe) => ({
  type: REPO_COMMIT_FREQUENCY_REQUEST,
  payload: { repo, dateRange, timeframe },
});

export const repoUserParticipationRequest = (repo, dateRange) => ({
  type: REPO_USER_PARTICIPATION_REQUEST,
  payload: { repo, dateRange },
});

export const repoClassificationChartRequest = (repo, dateRange, timeframe) => ({
  type: REPO_CLASSIFICATION_CHART_REQUEST,
  payload: { repo, dateRange, timeframe },
});

export const repoActivityRequest = (repo, type, sort, dateRange) => ({
  type: REPO_ACTIVITY_REQUEST,
  payload: { repo, type, sort, dateRange },
});

export const resetRepoUserPerformance = () => ({
    type: RESET_REPOUSERPERFORMANCE
})

export const repoUserCommitPerformanceRequest = (repo, dateRange, skip, limit) => ({
  type: REPO_USERCOMMITPERFORMANCE_REQUEST,
  payload: { repo, dateRange,skip, limit },
});

export const repoUserCommitPerformanceSuccess = (response) => ({
  type: REPO_USERCOMMITPERFORMANCE_SUCCESS,
  payload: response,
});

export const repoUserCommitPerformanceFailure = (error) => ({
  type: REPO_USERCOMMITPERFORMANCE_FAILURE,
  payload: error,
});

export const resetRepoRequest = () => ({
    type: RESET_REPO
});

export const commitTypeScoreAnalysisRequest = (repo, dateRange,type) => ({
  type: COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST,
  payload: { repo, dateRange , type},
});

export const repoTotalCommitAnalysisRequest = (repoId) => ({
  type: REPO_TOTALCOMMITS_ANALYSIS_REQUEST,
  payload: {repoId},
});