import {
  ORGOVERVIEW_FAILURE,
  ORGOVERVIEW_REQUEST,
  ORGOVERVIEW_SUCCESS,
  REPOAVGSCORECHART_FAILURE,
  REPOAVGSCORECHART_REQUEST,
  REPOAVGSCORECHART_SUCCESS,
  USERPERFORMANCECHART_FAILURE,
  USERPERFORMANCECHART_REQUEST,
  USERPERFORMANCECHART_SUCCESS,
  ORGHEATMAP_REQUEST,
  ORGHEATMAP_SUCCESS,
  ORGHEATMAP_FAILURE,
  ORGACTIVITY_REQUEST,
  ORGACTIVITY_SUCCESS,
  ORGACTIVITY_FAILURE,
  ORGALERTS_REQUEST,
  ORGALERTS_SUCCESS,
  ORGALERTS_FAILURE,
  RESET_ORG,
  ORG_TOTALCOMMITS_ANALYSIS_REQUEST,
  ORG_TOTALCOMMITS_ANALYSIS_SUCCESS,
  ORG_TOTALCOMMITS_ANALYSIS_FAILURE
} from '../actions/orgDashboardAction';

export const initialState = {
  orgOverview: {
    loading: false,
    data: {}
  },
  userPerformance: {
    loading: false,
    data: []
  },
  repoAvgScoreChart: {
    loading: false,
    data: {}
  },
  orgHeatMap: {
    loading: false,
    data: []
  },
  orgActivity: {
    loading: false,
    data: []
  },
  orgAlerts: {
    loading: false,
    data: []
  },
  orgTotalCommitAnalysis: {
    loading: false,
    data: [],
    error: null
  },
  loading: false,
  error: ''
};

const orgDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORGHEATMAP_REQUEST:
      return {
        ...state, orgHeatMap: {
          ...state.orgHeatMap,
          loading: true
        }
      };
    case ORGHEATMAP_SUCCESS:
      return {
        ...state,
        orgHeatMap: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case ORGHEATMAP_FAILURE:
      return {
        ...state,
        orgHeatMap: {
          loading: false,
          data: {}
        },
        error: action.payload
      };
    case ORGOVERVIEW_REQUEST:
      return {
        ...state, orgOverview: {
          ...state.orgOverview,
          loading: true
        }
      };
    case ORGOVERVIEW_SUCCESS:
      return {
        ...state,
        orgOverview: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case ORGOVERVIEW_FAILURE:
      return {
        ...state,
        orgOverview: {
          loading: false,
          data: {}
        },
        error: action.payload
      };

    case USERPERFORMANCECHART_REQUEST:
      return {
        ...state,
        userPerformance: {
          ...state.userPerformance,
          loading: true
        }
      };
    case USERPERFORMANCECHART_SUCCESS:
      return {
        ...state,
        userPerformance: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case USERPERFORMANCECHART_FAILURE:
      return {
        ...state,
        userPerformance: {
          loading: false,
          data: []
        },
        error: action.payload
      };
    case REPOAVGSCORECHART_REQUEST:
      return {
        ...state,
        repoAvgScoreChart: {
          ...state.repoAvgScoreChart,
          loading: true
        }
      };
    case REPOAVGSCORECHART_SUCCESS:
      return {
        ...state,
        repoAvgScoreChart: {
          loading: false,
          data: action.payload
        },
        error: ''
      };

    case REPOAVGSCORECHART_FAILURE:
      return {
        ...state,
        repoAvgScoreChart: {
          loading: false,
          data: []
        },
        error: action.payload
      };
      case ORGACTIVITY_REQUEST:
        return {
          ...state,
          orgActivity: {
            ...state.orgActivity,
            loading: true
          }
        };
      case ORGACTIVITY_SUCCESS:
        return {
          ...state,
          orgActivity: {
            loading: false,
            data: action.payload
          },
          error: ''
        };
  
      case ORGACTIVITY_FAILURE:
        return {
          ...state,
          orgActivity: {
            loading: false,
            data: []
          },
          error: action.payload
        };
      
      case ORGALERTS_REQUEST:
        return {
          ...state,
          orgAlerts: {
            ...state.orgAlerts,
            loading: true
          }
        };
      case ORGALERTS_SUCCESS:
        return {
          ...state,
          orgAlerts: {
            loading: false,
            data: action.payload
          },
          error: ''
        };
  
      case ORGALERTS_FAILURE:
        return {
          ...state,
          orgAlerts: {
            loading: false,
            data: []
          },
          error: action.payload
        };
      case RESET_ORG:
        return initialState;
              case ORG_TOTALCOMMITS_ANALYSIS_REQUEST:
                    return {
                      ...state,
                      orgTotalCommitAnalysis: {
                        ...state.orgTotalCommitAnalysis,
                        loading: true,
                        error: null
                      }
                    };
                  case ORG_TOTALCOMMITS_ANALYSIS_SUCCESS:
                    return {
                      ...state,
                      orgTotalCommitAnalysis: {
                        loading: false,
                        data: action.payload,
                        error: null
                      }
                    };
                  case ORG_TOTALCOMMITS_ANALYSIS_FAILURE:
                    return {
                      ...state,
                      orgTotalCommitAnalysis: {
                        loading: false,
                        data: null,
                        error: action.payload
                      }
                    };   
      default:
      return state;
  }
};

export default orgDashboardReducer;
