import { takeLatest, put, spawn, debounce, retry } from 'redux-saga/effects';
import {searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess} from "../actions/actionsCreators.js";
import {CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST} from "../actions/actionTypes.js";
import {searchSkills} from "../api/index.js";

function filterChangeSearchAction({type, payload}) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== ""
}

function* debounceChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search))
}

// onChangeSearch
// worker
function* handleChangeSearchSaga({ payload }) {
  yield put(searchSkillsRequest(payload.search))
}

// watcher
function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga)
}

//onSearchSkills
//worker
function* handleSearchSkillsSaga({ payload }) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data = yield retry(retryCount, retryDelay, searchSkills, payload.search);
    yield put(searchSkillsSuccess(data))
  } catch (e) {
      yield put(searchSkillsFailure(e.message))
  }
}

//watcher
function* watchSearchSkillSaga(){
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga)
}


function* changeSearchSaga(){
  while (true) {
    /*const action = yield take(CHANGE_SEARCH_FIELD);
    if (action.payload.trim() === "") {
      continue
    }*/
    //const action = yield take(o => o.type === CHANGE_SEARCH_FIELD && action.payload.search.trim() !== "");
    //const action = yield take(filterChangeSearchAction);
    //yield put(searchSkillsRequest(action.payload.search));
    yield debounce(100, filterChangeSearchAction, debounceChangeSearchSaga)
  }
}

export default function* saga() {
  //yield spawn(changeSearchSaga);
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchChangeSearchSaga)
}