/*
 * SegmentBuilderReducer
 */

import {
  CHANGE_COMPARING_VALUES,
  CHANGE_FIELD,
  CHANGE_CRITERIA,
  ADD_CONDITION,
  REMOVE_CONDITION,
  GET_PROFILES_LIST,
  GET_PROFILES_LIST_SUCCESS,
  GET_PROFILES_LIST_FAILURE,
} from './constants';

import { INITIAL_PAGING_SKIP, PAGING_LIMIT } from '../../common/constants';

const defaultConditionItem = {
  comparingFields: {
    header: 'Fields',
    options: [
      {
        value: 'skills',
        display: 'Skills',
      },
      {
        value: 'schools',
        display: 'Schools',
      },
      {
        value: 'languages',
        display: 'Languages',
      },
    ],
    selectedItem: null,
  },

  comparingCriterias: {
    header: 'Criterias',
    options: [
      {
        value: 'equal',
        display: 'Equal',
      },
      {
        value: 'notEqual',
        display: 'Not Equal',
      },
    ],
    selectedItem: null,
  },

  comparingValues: {
    header: 'Values',
    selectedItems: [],
    options: {
      languages: [
        {
          header: 'Languages',
          values: ['English', 'Vietnamese', 'Japanese', 'French', 'Chinese'],
        },
      ],
      schools: [],
      skills: [
        {
          header: 'Programming Languages',
          values: ['golang', 'javascript', 'java', 'python', 'c++'],
        },
        {
          header: 'Frameworks',
          values: ['gin', 'tensorflow', 'keras', 'expressjs'],
        },
        {
          header: 'Fields',
          values: [
            'frontend',
            'backend',
            'machine learning',
            'deep learning',
            'management',
          ],
        },
      ],
    },
  },
};

// The initial state of the SegmentBuilder
export const initialState = {
  error: null,
  pagingSkip: INITIAL_PAGING_SKIP,
  searchTerm: '',
  requiredConditions: [{ ...defaultConditionItem }],
  optionalConditions: [{ ...defaultConditionItem }],
  profilesList: {
    limit: PAGING_LIMIT,
    results: [],
    skip: INITIAL_PAGING_SKIP,
    total: 0,
  },
};

function changeSelection(state, action, comparingType, selectedProp) {
  const { conditionType, idx, changingVal } = action;
  const conds = [...state[conditionType]];
  const newCond = { ...conds[idx] };
  const newComparingTypes = { ...newCond[comparingType] };
  newComparingTypes[selectedProp] = changingVal;
  newCond[comparingType] = newComparingTypes;
  conds[idx] = newCond;
  return {
    ...state,
    [conditionType]: conds,
  };
}

function addCondition(state, action) {
  const { conditionType } = action;
  const conds = [...state[conditionType], { ...defaultConditionItem }];
  return {
    ...state,
    [conditionType]: conds,
  };
}

function removeCondition(state, action) {
  const { index, conditionType } = action;
  const conds = [...state[conditionType]];
  const condLen = conds.length;
  // didn't want to use splice function since that func will do mutation on conds arr
  let newConds = [];
  if (index == 0) {
    newConds = conds.slice(1, condLen);
  } else if (index === condLen - 1) {
    newConds = conds.slice(0, condLen - 1);
  } else {
    newConds = [...conds.slice(0, index), ...conds.slice(index + 1, condLen)];
  }
  return {
    ...state,
    [conditionType]: newConds,
  };
}

function segementBuilderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD:
      return changeSelection(state, action, 'comparingFields', 'selectedItem');

    case CHANGE_CRITERIA:
      return changeSelection(
        state,
        action,
        'comparingCriterias',
        'selectedItem',
      );

    case CHANGE_COMPARING_VALUES:
      return changeSelection(state, action, 'comparingValues', 'selectedItems');

    case ADD_CONDITION:
      return addCondition(state, action);

    case REMOVE_CONDITION:
      return removeCondition(state, action);

    case GET_PROFILES_LIST:
      return state;

    case GET_PROFILES_LIST_SUCCESS:
      return {
        ...state,
        profilesList: action.profilesList,
      };

    case GET_PROFILES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

export default segementBuilderReducer;
