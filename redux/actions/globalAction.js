export const SET_TIMERANGE = "SET_TIMERANGE";
export const FETCH_GLOBALCONFIG_REQUEST = "FETCH_GLOBALCONFIG_REQUEST";
export const FETCH_GLOBALCONFIG_SUCCESS = "FETCH_GLOBALCONFIG_SUCCESS";
export const FETCH_GLOBALCONFIG_FAILURE = "FETCH_GLOBALCONFIG_FAILURE";

export const setTimeRangeData = (timeRange) => ({
    type: SET_TIMERANGE,
    payload: {timeRange}
});

export const fetchGlobalConfigRequest = () => ({
    type: FETCH_GLOBALCONFIG_REQUEST
});

export const fetchGlobalConfigSuccess = (payload) => ({
    type: FETCH_GLOBALCONFIG_SUCCESS,
    payload: payload
});

export const fetchGlobalConfigFailure = (error) => ({
    type: FETCH_GLOBALCONFIG_FAILURE,
    payload: error
});