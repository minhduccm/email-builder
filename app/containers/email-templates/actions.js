/*
 * EmailTemplates Actions
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

export function getEmailTemplatesList() {
  return {
    type: GET_EMAIL_TEMPLATES_LIST,
  };
}

export function getEmailTemplatesListSuccess({ emailTplsList, isLoadingMore }) {
  return {
    type: GET_EMAIL_TEMPLATES_LIST_SUCCESS,
    emailTemplatesList: emailTplsList,
    isLoadingMore,
  };
}

export function getEmailTemplatesListFailure(error) {
  return {
    type: GET_EMAIL_TEMPLATES_LIST_FAILURE,
    error,
  };
}

export function expandEmailTemplate(emailTplId) {
  return {
    type: EXPAND_EMAIL_TEMPLATE,
    emailTplId,
  };
}

export function deleteEmailTemplate() {
  return {
    type: DELETE_EMAIL_TEMPLATE_BY_ID,
  };
}

export function deleteEmailTemplateSuccess(emailTplId) {
  return {
    type: DELETE_EMAIL_TEMPLATE_BY_ID_SUCCESS,
    emailTplId,
  };
}

export function deleteEmailTemplateFailure(error) {
  return {
    type: DELETE_EMAIL_TEMPLATE_BY_ID_FAILURE,
    error,
  };
}

export function toggleDeletionConfirmationDialog(emailTplId) {
  return {
    type: TOGGLE_DELETION_CONFIRMATION_DIALOG,
    emailTplId,
  };
}
