/*
 * Candidates reducer
 */

import {} from './constants';

import { INITIAL_PAGING_SKIP, PAGING_LIMIT } from '../../common/constants';

import { TOGGLE_MORE_ACTIONS_ON_ITEM, TOGGLE_MORE_ACTIONS_ON_HEADER } from './constants';

// The initial state of the SegmentBuilder
export const initialState = {
  error: null,
  candidatesByStatusType: {
    limit: PAGING_LIMIT,
    results: [
      {
        company: 'Brazn',
        headline: 'Senior Software Developer at Brazn',
        id: '4fe597f3-e882-4559-9877-c45930534c20',
        image:
          'https://media.licdn.com/dms/image/C5103AQHL2qMGR2fypg/profile-displayphoto-shrink_800_800/0?e=1555545600&v=beta&t=uGVG5UkWvz7Aqny2PTTFiS_xpM0SY0TK8g4jhL1weFA',
        name: 'Nha Bui',
        userId: 'bngnh',
      },
    ],
    skip: INITIAL_PAGING_SKIP,
    total: 0,
  },
  moreActionsOnItems: [
    {
      anchorEl: null,
    },
  ],
  moreActionsOnHeader: {
    anchorEl: null,
  },
};

function toggleMoreActionsOnItem(state, action) {
  const { idx, anchorEl } = action;
  const moreActionsOnItems = [...state.moreActionsOnItems];
  const moreActionsOnItem = moreActionsOnItems[idx];
  const newMoreActionsOnItem = {
    anchorEl: !moreActionsOnItem.anchorEl ? anchorEl : null,
  };
  moreActionsOnItems[idx] = newMoreActionsOnItem;
  return {
    ...state,
    moreActionsOnItems,
  };
}

function toggleMoreActionsOnHeader(state, action) {
  return {
    ...state,
    moreActionsOnHeader: {
      anchorEl: !state.moreActionsOnHeader.anchorEl ? action.anchorEl : null,
    },
  };
}

function candidatesReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MORE_ACTIONS_ON_ITEM:
      return toggleMoreActionsOnItem(state, action);

    case TOGGLE_MORE_ACTIONS_ON_HEADER:
      return toggleMoreActionsOnHeader(state, action);

    default:
      return state;
  }
}

export default candidatesReducer;
