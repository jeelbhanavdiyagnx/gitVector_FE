import {
  CODEQUALITYCHART_FAILURE,
  CODEQUALITYCHART_REQUEST,
  CODEQUALITYCHART_SUCCESS,
  REPOLEVELPERFORMANCE_FAILURE,
  REPOLEVELPERFORMANCE_REQUEST,
  REPOLEVELPERFORMANCE_SUCCESS,
  REPOPARTICIPATION_FAILURE,
  REPOPARTICIPATION_REQUEST,
  REPOPARTICIPATION_SUCCESS,
  RESET_REPOLEVELPERFORMANCE,
  RESET_USER,
  RESET_USERCLASSIFICATIONCHART,
  RESET_USERCOMPARISONCHART,
  USER_COMMIT_FREQUENCY_FAILURE,
  USER_COMMIT_FREQUENCY_REQUEST,
  USER_COMMIT_FREQUENCY_SUCCESS,
  USER_COMMIT_TYPE_SCORE_FAILURE,
  USER_COMMIT_TYPE_SCORE_REQUEST,
  USER_COMMIT_TYPE_SCORE_SUCCESS,
  USER_REPOCOMMITPERFORMANCE_FAILURE,
  USER_REPOCOMMITPERFORMANCE_REQUEST,
  USER_REPOCOMMITPERFORMANCE_SUCCESS,
  USERACTIVITY_FAILURE,
  USERACTIVITY_REQUEST,
  USERACTIVITY_SUCCESS,
  USERALERT_FAILURE,
  USERALERT_REQUEST,
  USERALERT_SUCCESS,
  USERCLASSIFICATIONCHART_FAILURE,
  USERCLASSIFICATIONCHART_REQUEST,
  USERCLASSIFICATIONCHART_SUCCESS,
  USERCOMPARISONCHART_FAILURE,
  USERCOMPARISONCHART_REQUEST,
  USERCOMPARISONCHART_SUCCESS,
  USERHEATMAP_FAILURE,
  USERHEATMAP_REQUEST,
  USERHEATMAP_SUCCESS,
  USEROVERVIEW_FAILURE,
  USEROVERVIEW_REQUEST,
  USEROVERVIEW_SUCCESS
} from '../actions/userDashboardAction';

export const initialState = {
  userOverview: {
    loading: false,
    data: {}
  },
  userClassificationChart: {
    loading: false,
    data: []
  },
  userComparisonChart: {
    loading: false,
    data: {}
  },
  userHeatMap: {
    loading: false,
    data: []
  },
  repoLevelPerformance: {
    loading: false,
    data: []
  },
  codeQualityChart: {
    loading: false,
    data: []
  },
  repoParticipationChart: {
    loading: false,
    data: []
  },
  userActivity: {
    loading: false,
    data: []
  },
  userAlerts: {
    loading: false,
    data: []
  },
  userRepoCommitPerformance: {
    loading: false,
    data: []
  },
  userCommitFrequency: {
    loading: false,
    data: [],
    error: null
  },
  userCommitScoreTypeAnalysis: {
    loading: false,
    data: [],
    error: null
  },
  loading: false,
  error: ''
};

const userDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERHEATMAP_REQUEST:
      return {
        ...state,
        userHeatMap: {
          ...state.userHeatMap,
          loading: true
        }
      };
    case USERHEATMAP_SUCCESS:
      return {
        ...state,
        userHeatMap: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USERHEATMAP_FAILURE:
      return {
        ...state,
        userHeatMap: {
          loading: false,
          data: {}
        },
        error: action.payload
      };
    case USEROVERVIEW_REQUEST:
      return {
        ...state,
        userOverview: {
          ...state.userOverview,
          loading: true
        }
      };
    case USEROVERVIEW_SUCCESS:
      return {
        ...state,
        userOverview: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USEROVERVIEW_FAILURE:
      return {
        ...state,
        userOverview: {
          loading: false,
          data: {}
        },
        error: action.payload
      };

    case USERCLASSIFICATIONCHART_REQUEST:
      return {
        ...state,
        userClassificationChart: {
          ...state.userClassificationChart,
          loading: true
        }
      };
    case USERCLASSIFICATIONCHART_SUCCESS:
      return {
        ...state,
        userClassificationChart: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USERCLASSIFICATIONCHART_FAILURE:
      return {
        ...state,
        userClassificationChart: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case USERCOMPARISONCHART_REQUEST:
      return {
        ...state,
        userComparisonChart: {
          ...state.userComparisonChart,
          loading: true
        }
      };
    case USERCOMPARISONCHART_SUCCESS:
      return {
        ...state,
        userComparisonChart: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USERCOMPARISONCHART_FAILURE:
      return {
        ...state,
        userComparisonChart: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case REPOLEVELPERFORMANCE_REQUEST:
      return {
        ...state,
        repoLevelPerformance: {
          ...state.repoLevelPerformance,
          loading: true
        }
      };
    case REPOLEVELPERFORMANCE_SUCCESS:
      return {
        ...state,
        repoLevelPerformance: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case REPOLEVELPERFORMANCE_FAILURE:
      return {
        ...state,
        repoLevelPerformance: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case CODEQUALITYCHART_REQUEST:
      return {
        ...state,
        codeQualityChart: {
          ...state.codeQualityChart,
          loading: true
        }
      };
    case CODEQUALITYCHART_SUCCESS:
      return {
        ...state,
        codeQualityChart: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case CODEQUALITYCHART_FAILURE:
      return {
        ...state,
        codeQualityChart: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case REPOPARTICIPATION_REQUEST:
      return {
        ...state,
        repoParticipationChart: {
          ...state.repoParticipationChart,
          loading: true
        }
      };
    case REPOPARTICIPATION_SUCCESS:
      return {
        ...state,
        repoParticipationChart: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case REPOPARTICIPATION_FAILURE:
      return {
        ...state,
        repoParticipationChart: {
          loading: false,
          data: []
        },
        error: action.payload
      };

    case RESET_REPOLEVELPERFORMANCE:
      return {
        ...state,
        repoLevelPerformance: {
          ...initialState.repoLevelPerformance
        }
      };

    case RESET_USERCOMPARISONCHART:
      return {
        ...state,
        userComparisonChart: {
          ...initialState.userComparisonChart
        }
      };
    case RESET_USERCLASSIFICATIONCHART:
      return {
        ...state,
        userClassificationChart: {
          ...initialState.userClassificationChart
        }
      };
    case USERACTIVITY_REQUEST:
      return {
        ...state,
        userActivity: {
          ...state.userActivity,
          loading: true
        }
      };
    case USERACTIVITY_SUCCESS:
      return {
        ...state,
        userActivity: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USERACTIVITY_FAILURE:
      return {
        ...state,
        userActivity: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case USERALERT_REQUEST:
      return {
        ...state,
        userAlerts: {
          ...state.userAlerts,
          loading: true
        }
      };
    case USERALERT_SUCCESS:
      return {
        ...state,
        userAlerts: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USERALERT_FAILURE:
      return {
        ...state,
        userAlerts: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case RESET_USER:
      return initialState;
    case USER_REPOCOMMITPERFORMANCE_REQUEST:
      return {
        ...state,
        userRepoCommitPerformance: {
          ...state.userRepoCommitPerformance,
          loading: true,
          error: null
        }
      };
    case USER_REPOCOMMITPERFORMANCE_SUCCESS:
      return {
        ...state,
        userRepoCommitPerformance: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case USER_REPOCOMMITPERFORMANCE_FAILURE:
      return {
        ...state,
        userRepoCommitPerformance: {
          loading: false,
          data: null,
          error: action.payload
        }
      };
    case USER_COMMIT_FREQUENCY_REQUEST:
      return {
        ...state,
        userCommitFrequency: {
          ...state.userCommitFrequency,
          loading: true,
          error: null
        }
      };
    case USER_COMMIT_FREQUENCY_SUCCESS:
      return {
        ...state,
        userCommitFrequency: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case USER_COMMIT_FREQUENCY_FAILURE:
      return {
        ...state,
        userCommitFrequency: {
          loading: false,
          data: null,
          error: action.payload
        }
      };
      case USER_COMMIT_TYPE_SCORE_REQUEST:
        return {
          ...state,
          userCommitScoreTypeAnalysis: {
            ...state.userCommitScoreTypeAnalysis,
            loading: true,
            error: null
          }
        };
      case USER_COMMIT_TYPE_SCORE_SUCCESS:
        return {
          ...state,
          userCommitScoreTypeAnalysis: {
            loading: false,
            data: action.payload,
            error: null
          }
        };
      case USER_COMMIT_TYPE_SCORE_FAILURE:
        return {
          ...state,
          userCommitScoreTypeAnalysis: {
            loading: false,
            data: null,
            error: action.payload
          }
        };
  
    default:
      return state;
  }
};

export default userDashboardReducer;
