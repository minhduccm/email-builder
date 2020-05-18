/*
 * EmailTemplates reducer
 */

import {
  EXPAND_EMAIL_TEMPLATE,
  GET_EMAIL_TEMPLATES_LIST,
  GET_EMAIL_TEMPLATES_LIST_FAILURE,
  GET_EMAIL_TEMPLATES_LIST_SUCCESS,
  DELETE_EMAIL_TEMPLATE_BY_ID,
  DELETE_EMAIL_TEMPLATE_BY_ID_FAILURE,
  DELETE_EMAIL_TEMPLATE_BY_ID_SUCCESS,
  TOGGLE_DELETION_CONFIRMATION_DIALOG,
} from './constants';

import { INITIAL_PAGING_SKIP, PAGING_LIMIT } from '../../common/constants';

// The initial state of the EmailTemplates
export const initialState = {
  error: null,
  pagingSkip: INITIAL_PAGING_SKIP,
  manipulatingEmailTplId: '', // for deletion only for now
  expandedEmailTplId: '',
  emailTemplatesList: {
    limit: PAGING_LIMIT,
    results: [],
    skip: INITIAL_PAGING_SKIP,
    total: 0,
  },
  isDeletionConfirmationOpened: false,
};

function handleExpandEmailTpl(state, action) {
  if (
    !state.expandedEmailTplId ||
    state.expandedEmailTplId !== action.emailTplId
  ) {
    return {
      ...state,
      expandedEmailTplId: action.emailTplId,
    };
  }
  if (state.expandedEmailTplId === action.emailTplId) {
    return {
      ...state,
      expandedEmailTplId: '',
    };
  }
  return state;
}

function handleDelEmailTplSuccess(state, action) {
  const { skip, results, total } = state.emailTemplatesList;
  const deletedEmailTplId = action.emailTplId;
  const newResults = results.filter(
    item => item.emailTplId !== deletedEmailTplId,
  );
  const newEmailTemplatesList = {
    limit: PAGING_LIMIT,
    results: newResults,
    skip: skip - 1,
    total: total - 1,
  };
  return {
    ...state,
    emailTemplatesList: newEmailTemplatesList,
    pagingSkip: state.pagingSkip - 1,
    error: null,
  };
}

function handleGetEmailTplsListSuccess(state, action) {
  const newEmailTplsList = action.emailTemplatesList;
  const oldEmailTplsList = state.emailTemplatesList;
  const results = action.isLoadingMore
    ? [...oldEmailTplsList.results, ...newEmailTplsList.results]
    : newEmailTplsList.results;
  return {
    ...state,
    emailTemplatesList: {
      ...newEmailTplsList,
      results,
    },
    pagingSkip: state.pagingSkip + newEmailTplsList.limit,
    error: null,
  };
}

function emailTemplatesReducer(state = initialState, action) {
  switch (action.type) {
    case EXPAND_EMAIL_TEMPLATE:
      return handleExpandEmailTpl(state, action);

    case GET_EMAIL_TEMPLATES_LIST:
      return state;

    case GET_EMAIL_TEMPLATES_LIST_SUCCESS:
      return handleGetEmailTplsListSuccess(state, action);

    case GET_EMAIL_TEMPLATES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case DELETE_EMAIL_TEMPLATE_BY_ID:
      return state;

    case DELETE_EMAIL_TEMPLATE_BY_ID_SUCCESS:
      return handleDelEmailTplSuccess(state, action);

    case DELETE_EMAIL_TEMPLATE_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case TOGGLE_DELETION_CONFIRMATION_DIALOG:
      return {
        ...state,
        manipulatingEmailTplId: !state.isDeletionConfirmationOpened
          ? action.emailTplId
          : '',
        isDeletionConfirmationOpened: !state.isDeletionConfirmationOpened,
      };

    default:
      return state;
  }
}

export default emailTemplatesReducer;
