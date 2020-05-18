/*
 * SegmentBuilder actions
 */

import {
  CHANGE_COMPARING_VALUES,
  CHANGE_FIELD,
  CHANGE_CRITERIA,
  ADD_CONDITION,
  REMOVE_CONDITION,
  GET_PROFILES_LIST,
  GET_PROFILES_LIST_FAILURE,
  GET_PROFILES_LIST_SUCCESS,
} from './constants';

export function changeComparingValues(idx, conditionType, selectedValues) {
  return {
    type: CHANGE_COMPARING_VALUES,
    idx,
    conditionType,
    changingVal: selectedValues,
  };
}

export function changeField(idx, conditionType, changingVal) {
  return {
    type: CHANGE_FIELD,
    idx,
    conditionType,
    changingVal,
  };
}

export function changeCriteria(idx, conditionType, changingVal) {
  return {
    type: CHANGE_CRITERIA,
    idx,
    conditionType,
    changingVal,
  };
}

export function addCondition(conditionType) {
  return {
    type: ADD_CONDITION,
    conditionType,
  };
}

export function removeCondition(index, conditionType) {
  return {
    type: REMOVE_CONDITION,
    index,
    conditionType,
  };
}

export function getProfilesList() {
  return {
    type: GET_PROFILES_LIST,
  };
}

export function getProfilesListSuccess(profilesList) {
  return {
    type: GET_PROFILES_LIST_SUCCESS,
    profilesList,
  };
}

export function getProfilesListFailure(error) {
  return {
    type: GET_PROFILES_LIST_FAILURE,
    error,
  };
}
