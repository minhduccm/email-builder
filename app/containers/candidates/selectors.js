/**
 * Candidates selectors
 */

import { createSelector } from 'reselect';

const selectCandidates = state => state.candidates; // 'candidates' here should match to registered reducer name in index.js
const makeSelectCandidatesByStatusType = () =>
  createSelector(
    selectCandidates,
    candidatesState => candidatesState.candidatesByStatusType,
  );

const makeSelectMoreActionsOnItems = () =>
  createSelector(
    selectCandidates,
    candidatesState => candidatesState.moreActionsOnItems,
  );

const makeSelectMoreActionsOnHeader = () =>
  createSelector(
    selectCandidates,
    candidatesState => candidatesState.moreActionsOnHeader,
  );

export {
  selectCandidates,
  makeSelectCandidatesByStatusType,
  makeSelectMoreActionsOnItems,
  makeSelectMoreActionsOnHeader,
};
