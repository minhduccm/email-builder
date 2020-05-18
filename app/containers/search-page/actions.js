/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SEARCH,
  SEARCH_SUCCESS,
  GET_PROFILES_LIST,
  GET_PROFILES_LIST_FAILURE,
  GET_PROFILES_LIST_SUCCESS,
} from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of SEARCH
 */
export function search(searchTerm) {
  return async (dispatch, getState) => {
    console.log('search thunk');
    dispatch(searchSuccess(searchTerm));
    // try {
    //   await authenticateUser(userInfo.token);
    //   dispatch(setCurrentUserAfterSignedIn(userInfo));
    //   handleSuccess(dispatch, signInSuccess, userInfo);
    //   const navAction = NavigationActions.navigate({
    //     routeName: 'SignedInNavigator',
    //     params: {}
    //   });
    //   dispatch(navAction);
    // }
    // catch(e) {
    //   await handleFailure(dispatch, signInFailure, handleFailureGlobally, e);
    // }
  };
}

export function searchSuccess(searchTerm) {
  return {
    type: SEARCH_SUCCESS,
    searchTerm,
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