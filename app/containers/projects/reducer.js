/*
* Projects reducer
*/

import { CLOSE_NEW_PROJECT_DIALOG, OPEN_NEW_PROJECT_DIALOG } from './constants';

// The initial state of the Projects
export const initialState = {
  error: null,
  isOpenNewProjectDialog: false,
};

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_NEW_PROJECT_DIALOG:
      return {
        ...state,
        isOpenNewProjectDialog: false,
      };

    case OPEN_NEW_PROJECT_DIALOG:
      return {
        ...state,
        isOpenNewProjectDialog: true,
      };

    default:
      return state;
  }
}

export default projectsReducer;
