import {legacy_createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {combineEpics, createEpicMiddleware} from "redux-observable";
import skillsReducer from "../reducers/skills.js";
import {changeSearchEpic, searchSkillsEpic} from "../epics/index.js";

const reducer = combineReducers({skills: skillsReducer});
const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epic = combineEpics(
  changeSearchEpic,
  searchSkillsEpic,
)

const epicMiddleware = createEpicMiddleware()
const store = legacy_createStore(reducer, composeEnhansers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(epic)
export default store