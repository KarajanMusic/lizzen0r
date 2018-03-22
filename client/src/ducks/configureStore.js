import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import Initialiser from 'initialiser';
//import { default as <MODULE_NAME> } from 'ducks/modules/<MODULE_NAME>';

const loggerMiddleware = createLogger();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(Initialiser.history);

const store = createStore(
    combineReducers({
        /*MODULE_NAME*/
    }),
    Initialiser.initialState,
    applyMiddleware(thunkMiddleware, loggerMiddleware, historyMiddleware),
);

export default store;
