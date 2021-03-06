/**
 * Combine all reducers in this file and export the combined reducers.
 */

// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router/immutable';
import { connectRouter } from 'connected-react-router'

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
// import searchReducer from 'containers/search-page/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    // router: connectRouter(history),
    // search: searchReducer,
    ...injectedReducers,
  });
  // return rootReducer

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
