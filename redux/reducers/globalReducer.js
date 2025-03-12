import { FETCH_GLOBALCONFIG_FAILURE, FETCH_GLOBALCONFIG_REQUEST, FETCH_GLOBALCONFIG_SUCCESS, SET_TIMERANGE } from "../actions/globalAction";

export const initialState = {
  timeRanges: 'Select Date',
  globalConfigData: {
    loading: false,
    data: [],
    error: ""
  }
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMERANGE:
      return {
        ...state,
        timeRanges: action.payload
      };
    case FETCH_GLOBALCONFIG_REQUEST:
            return {
              ...state,
              globalConfigData: {
                ...state.globalConfigData,
                loading: true
              }
            };
          case FETCH_GLOBALCONFIG_SUCCESS:
            return {
              ...state,
              globalConfigData: {
                loading: false,
                data: action.payload,
                error: ''
              },
            };
      
          case FETCH_GLOBALCONFIG_FAILURE:
            return {
              ...state,
              globalConfigData: {
                loading: false,
                data: [],
                error: action.payload
              },
            };
          
    default:
      return state;
  }
};

export default globalReducer;