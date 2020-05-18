/**
 * SegmentBuilder selectors
 */

import { createSelector } from 'reselect';

const selectSegmentBuilder = state => state.segmentBuilder; // 'segmentBuilder' here should match to registered reducer name in index.js

const makeSelectRequiredConditions = () =>
  createSelector(
    selectSegmentBuilder,
    segmentBuilderState => segmentBuilderState.requiredConditions,
  );

const makeSelectOptionalConditions = () =>
  createSelector(
    selectSegmentBuilder,
    segmentBuilderState => segmentBuilderState.optionalConditions,
  );

const makeSelectProfilesList = () =>
  createSelector(
    selectSegmentBuilder,
    segmentBuilderState => segmentBuilderState.profilesList,
  );

const makeSelectSearchTerm = () =>
  createSelector(
    selectSegmentBuilder,
    segmentBuilderState => segmentBuilderState.searchTerm,
  );

const makeSelectPagingSkip = () =>
  createSelector(
    selectSegmentBuilder,
    segmentBuilderState => segmentBuilderState.pagingSkip,
  );

export {
  selectSegmentBuilder,
  makeSelectRequiredConditions,
  makeSelectOptionalConditions,
  makeSelectProfilesList,
  makeSelectSearchTerm,
  makeSelectPagingSkip,
};
