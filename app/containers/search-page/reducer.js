/*
 * SearchReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  SEARCH,
  SEARCH_SUCCESS,
  GET_PROFILES_LIST,
  GET_PROFILES_LIST_SUCCESS,
  GET_PROFILES_LIST_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  error: null,
  searchTerm: '',
  profilesList: {
    limit: 10,
    results: [],
    skip: 0,
    total: 0,
  },
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return state;

    case SEARCH_SUCCESS:
      return {
      	...state,
      	searchTerm: action.searchTerm,
      };

    case GET_PROFILES_LIST:
      return state;

    case GET_PROFILES_LIST_SUCCESS:
      return {
        ...state,
        profilesList: action.profilesList,
      };

    case GET_PROFILES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

export default searchReducer;