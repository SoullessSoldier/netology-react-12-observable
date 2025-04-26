import {ofType} from 'redux-observable'
import {of} from "rxjs"
import {ajax} from "rxjs/ajax"
import {map, tap, retry, debounceTime, catchError, filter, switchMap} from 'rxjs/operators'
import {CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST} from "../actions/actions.js";
import {searchSkillsSuccess, searchSkillsFailure, searchSkillsRequest} from "../actions/actionCreators.js";

export const changeSearchEpic = (action$) => action$.pipe(
    ofType(CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    filter(o => o !== ""),
    debounceTime(100),
    map(o => searchSkillsRequest(o))
  )


export const searchSkillsEpic = (action$) => {
  return action$.pipe(
    ofType(SEARCH_SKILLS_REQUEST),
    map(o => o.payload.search),
    map(o => new URLSearchParams({query: o})),
    tap(o => console.log("searchSkillsEpic o", o)),
    switchMap(o => ajax.getJSON(`${import.meta.env.VITE_APP_SEARCH_URL}?${o}`).pipe(
      map(o => searchSkillsSuccess(o)),
      catchError(e => of(searchSkillsFailure(e)))
    )),

  )
}