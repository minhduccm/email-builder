/**
 * Projects selectors
 */

import { createSelector } from 'reselect';

const selectProjects = state => state.projects; // 'projects' here should match to registered reducer name in index.js

const makeSelectIsOpenNewProjectDialog = () =>
  createSelector(
    selectProjects,
    projectsState => projectsState.isOpenNewProjectDialog,
  );

export { selectProjects, makeSelectIsOpenNewProjectDialog };
