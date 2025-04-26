import {legacy_createStore, combineReducers, applyMiddleware, compose} from "redux/src";
import createSagaMiddleware from "redux-saga";
import skillsReducer from "../reducers/skills.js";
import saga from "./sagas";

const reducer = combineReducers({skills: skillsReducer});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware();
const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);
export default store;