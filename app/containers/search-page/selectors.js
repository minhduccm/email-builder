/**
 * Search selectors
 */

import { createSelector } from 'reselect';

const selectSearch = state => state.search;

const makeSelectSearchTerm = () =>
  createSelector(selectSearch, searchState => searchState.searchTerm);

const makeSelectProfilesList = () =>
  createSelector(selectSearch, searchState => searchState.profilesList);

export { selectSearch, makeSelectSearchTerm, makeSelectProfilesList };