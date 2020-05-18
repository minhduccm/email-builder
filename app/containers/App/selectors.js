import { createSelector } from 'reselect';

// const selectRouter = state => state.get('router');
const selectRouter = state => state.router;

const makeSelectLocation = () => createSelector(selectRouter, routerState => routerState.location);

export { makeSelectLocation };
