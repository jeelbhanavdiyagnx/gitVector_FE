import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_GLOBALCONFIG_REQUEST, fetchGlobalConfigFailure, fetchGlobalConfigSuccess } from "../actions/globalAction";
import { fetchJSON } from "@/components/utils/apiCalls";
import appConfig from "@/components/utils/appConfig";

function* getGlobalConfigSaga() {
    try {
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          };
        const response = yield call(fetchJSON, appConfig.getGlobalConfig, options);
        yield put(fetchGlobalConfigSuccess(response.data))
    } catch (error) {
        yield put(fetchGlobalConfigFailure(error))
    }
}

function* globalConfig() {
    yield all([
        takeLatest(FETCH_GLOBALCONFIG_REQUEST,getGlobalConfigSaga)
    ])
}

export default globalConfig;