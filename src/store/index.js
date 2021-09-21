import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import userReducer from './reducers/users';
import citiesReducer from './reducers/cities';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const rootReducer = combineReducers({
    user: userReducer,
    cities: citiesReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;