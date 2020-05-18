/*
* Candidates actions
*/

import {
  TOGGLE_MORE_ACTIONS_ON_ITEM,
  TOGGLE_MORE_ACTIONS_ON_HEADER,
} from './constants';

export function toggleMoreActionsOnItem(idx, anchorEl) {
  return {
    type: TOGGLE_MORE_ACTIONS_ON_ITEM,
    idx,
    anchorEl,
  };
}

export function toggleMoreActionsOnHeader(anchorEl) {
  return {
    type: TOGGLE_MORE_ACTIONS_ON_HEADER,
    anchorEl,
  };
}
