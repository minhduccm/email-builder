/* 
* Project actions
*/

import { CLOSE_NEW_PROJECT_DIALOG, OPEN_NEW_PROJECT_DIALOG } from './constants';

export function closeNewProjectDialog() {
  return {
    type: CLOSE_NEW_PROJECT_DIALOG,
  };
}

export function openNewProjectDialog() {
  return {
    type: OPEN_NEW_PROJECT_DIALOG,
  };
}
