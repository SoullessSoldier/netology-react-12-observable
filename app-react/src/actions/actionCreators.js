import {CHANGE_SEARCH_FIELD, SEARCH_SKILLS_FAILURE, SEARCH_SKILLS_REQUEST, SEARCH_SKILLS_SUCCESS} from "./actions.js";

export function changeSearchField(search) {
  return {type: CHANGE_SEARCH_FIELD, payload: {search}}
}

export function searchSkillsRequest(search) {
  return {type: SEARCH_SKILLS_REQUEST, payload: {search}}
}

export function searchSkillsFailure(error) {
  return {type: SEARCH_SKILLS_FAILURE, payload: {error}}
}

export function searchSkillsSuccess(items) {
  return {type: SEARCH_SKILLS_SUCCESS, payload: {items}}
}