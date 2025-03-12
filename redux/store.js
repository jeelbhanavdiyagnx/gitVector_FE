// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// Check for token and user info in localStorage
const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const userInfo =
  typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;

// Initialize state based on local storage
const preloadedState = {
  auth: {
    isLoggedIn: !!token,
    jwt: token || '',
    user: userInfo ? JSON.parse(userInfo) : {},
    loading: false,
    message: ''
  }
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
