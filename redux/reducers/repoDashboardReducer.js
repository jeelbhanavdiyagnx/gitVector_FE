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
  REPO_ACTIVITY_FAILURE,
  REPO_ACTIVITY_REQUEST,
  REPO_ACTIVITY_SUCCESS,
  RESET_REPOUSERPERFORMANCE,
  REPO_USERCOMMITPERFORMANCE_REQUEST,
  REPO_USERCOMMITPERFORMANCE_SUCCESS,
  REPO_USERCOMMITPERFORMANCE_FAILURE,
  RESET_REPO,
  COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST,
  COMMIT_TYPE_SCORE_ANALAYSIS_SUCCESS,
  COMMIT_TYPE_SCORE_ANALAYSIS_FAILURE,
  repoTotalCommitAnalysisRequest,
  REPO_TOTALCOMMITS_ANALYSIS_REQUEST,
  REPO_TOTALCOMMITS_ANALYSIS_SUCCESS,
  REPO_TOTALCOMMITS_ANALYSIS_FAILURE
} from '../actions/repoDashboardAction';

const initialState = {
  repoOverview: {
    loading: false,
    data: null,
    error: null
  },
  repoContributionHeatmap: {
    loading: false,
    data: null,
    error: null
  },
  repoUserPerformanceChart: {
    loading: false,
    data: null,
    error: null
  },
  repoUserPerformance: {
    loading: false,
    data: null,
    error: null
  },
  repoCommitFrequency: {
    loading: false,
    data: null,
    error: null
  },
  repoUserParticipation: {
    loading: false,
    data: null,
    error: null
  },
  repoClassificationChart: {
    loading: false,
    data: null,
    error: null
  },
  repoActivity: {
    loading: false,
    data: null,
    error: null
  },
  repoUserCommitPerformance: {
    loading: false,
    data: null,
    error: null
  },
  commitTypeScoreAnalysisChart: {
    loading: false,
    data: null,
    error: null
  },
  repoTotalCommitAnalysis: {
    loading: false,
    data: null,
    error: null
  }
};

const repoDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // Repository Overview
    case REPO_OVERVIEW_REQUEST:
      return {
        ...state,
        repoOverview: { ...state.repoOverview, loading: true, error: null }
      };
    case REPO_OVERVIEW_SUCCESS:
      return {
        ...state,
        repoOverview: { loading: false, data: action.payload, error: null }
      };
    case REPO_OVERVIEW_FAILURE:
      return {
        ...state,
        repoOverview: { loading: false, data: null, error: action.payload }
      };

    // Contribution Heatmap
    case REPO_CONTRIBUTION_HEATMAP_REQUEST:
      return {
        ...state,
        repoContributionHeatmap: {
          ...state.repoContributionHeatmap,
          loading: true,
          error: null
        }
      };
    case REPO_CONTRIBUTION_HEATMAP_SUCCESS:
      return {
        ...state,
        repoContributionHeatmap: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case REPO_CONTRIBUTION_HEATMAP_FAILURE:
      return {
        ...state,
        repoContributionHeatmap: {
          loading: false,
          data: null,
          error: action.payload
        }
      };

    // User Performance Chart
    case REPO_USER_PERFORMANCE_CHART_REQUEST:
      return {
        ...state,
        repoUserPerformanceChart: {
          ...state.repoUserPerformanceChart,
          loading: true,
          error: null
        }
      };
    case REPO_USER_PERFORMANCE_CHART_SUCCESS:
      return {
        ...state,
        repoUserPerformanceChart: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case REPO_USER_PERFORMANCE_CHART_FAILURE:
      return {
        ...state,
        repoUserPerformanceChart: {
          loading: false,
          data: null,
          error: action.payload
        }
      };

    // User Performance
    case REPO_USER_PERFORMANCE_REQUEST:
      return {
        ...state,
        repoUserPerformance: {
          ...state.repoUserPerformance,
          loading: true,
          error: null
        }
      };
    case REPO_USER_PERFORMANCE_SUCCESS:
      return {
        ...state,
        repoUserPerformance: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case REPO_USER_PERFORMANCE_FAILURE:
      return {
        ...state,
        repoUserPerformance: {
          loading: false,
          data: null,
          error: action.payload
        }
      };

    // Commit Frequency
    case REPO_COMMIT_FREQUENCY_REQUEST:
      return {
        ...state,
        repoCommitFrequency: {
          ...state.repoCommitFrequency,
          loading: true,
          error: null
        }
      };
    case REPO_COMMIT_FREQUENCY_SUCCESS:
      return {
        ...state,
        repoCommitFrequency: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case REPO_COMMIT_FREQUENCY_FAILURE:
      return {
        ...state,
        repoCommitFrequency: {
          loading: false,
          data: null,
          error: action.payload
        }
      };

    // User Participation
    case REPO_USER_PARTICIPATION_REQUEST:
      return {
        ...state,
        repoUserParticipation: {
          ...state.repoUserParticipation,
          loading: true,
          error: null
        }
      };
    case REPO_USER_PARTICIPATION_SUCCESS:
      return {
        ...state,
        repoUserParticipation: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case REPO_USER_PARTICIPATION_FAILURE:
      return {
        ...state,
        repoUserParticipation: {
          loading: false,
          data: null,
          error: action.payload
        }
      };

    // Classification Chart
    case REPO_CLASSIFICATION_CHART_REQUEST:
      return {
        ...state,
        repoClassificationChart: {
          ...state.repoClassificationChart,
          loading: true,
          error: null
        }
      };
    case REPO_CLASSIFICATION_CHART_SUCCESS:
      return {
        ...state,
        repoClassificationChart: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case REPO_CLASSIFICATION_CHART_FAILURE:
      return {
        ...state,
        repoClassificationChart: {
          loading: false,
          data: null,
          error: action.payload
        }
      };

    // Activity
    case REPO_ACTIVITY_REQUEST:
      return {
        ...state,
        repoActivity: { ...state.repoActivity, loading: true, error: null }
      };
    case REPO_ACTIVITY_SUCCESS:
      return {
        ...state,
        repoActivity: { loading: false, data: action.payload, error: null }
      };
    case REPO_ACTIVITY_FAILURE:
      return {
        ...state,
        repoActivity: { loading: false, data: null, error: action.payload }
      };

    // Reset repo user performance
    case RESET_REPOUSERPERFORMANCE:
      return {
        ...state,
        repoUserPerformance: {
          ...initialState.repoUserPerformance
        }
      };

      // User commit Performance
      case REPO_USERCOMMITPERFORMANCE_REQUEST:
        return {
          ...state,
          repoUserCommitPerformance: {
            ...state.repoUserCommitPerformance,
            loading: true,
            error: null
          }
        };
      case REPO_USERCOMMITPERFORMANCE_SUCCESS:
        return {
          ...state,
          repoUserCommitPerformance: {
            loading: false,
            data: action.payload,
            error: null
          }
        };
      case REPO_USERCOMMITPERFORMANCE_FAILURE:
        return {
          ...state,
          repoUserCommitPerformance: {
            loading: false,
            data: null,
            error: action.payload
          }
        };
        case RESET_REPO:
          return initialState;
          case COMMIT_TYPE_SCORE_ANALAYSIS_REQUEST:
            return {
              ...state,
              commitTypeScoreAnalysisChart: {
                ...state.commitTypeScoreAnalysisChart,
                loading: true,
                error: null
              }
            };
          case COMMIT_TYPE_SCORE_ANALAYSIS_SUCCESS:
            return {
              ...state,
              commitTypeScoreAnalysisChart: {
                loading: false,
                data: action.payload,
                error: null
              }
            };
          case COMMIT_TYPE_SCORE_ANALAYSIS_FAILURE:
            return {
              ...state,
              commitTypeScoreAnalysisChart: {
                loading: false,
                data: null,
                error: action.payload
              }
            }; 
            case REPO_TOTALCOMMITS_ANALYSIS_REQUEST:
            return {
              ...state,
              repoTotalCommitAnalysis: {
                ...state.repoTotalCommitAnalysis,
                loading: true,
                error: null
              }
            };
          case REPO_TOTALCOMMITS_ANALYSIS_SUCCESS:
            return {
              ...state,
              repoTotalCommitAnalysis: {
                loading: false,
                data: action.payload,
                error: null
              }
            };
          case REPO_TOTALCOMMITS_ANALYSIS_FAILURE:
            return {
              ...state,
              repoTotalCommitAnalysis: {
                loading: false,
                data: null,
                error: action.payload
              }
            };    
    default:
      return state;
  }
};

export default repoDashboardReducer;
