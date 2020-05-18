/*
* EmailBuilder actions
*/

import {
  HANDLE_KEY_COMMAND,
  CHANGE_EDITOR,
  CHANGE_TITLE,
  GET_EMAIL_TEMPLATE_BY_ID,
  GET_EMAIL_TEMPLATE_BY_ID_SUCCESS,
  GET_EMAIL_TEMPLATE_BY_ID_FAILURE,
  CREATE_EMAIL_TEMPLATE,
  CREATE_EMAIL_TEMPLATE_SUCCESS,
  CREATE_EMAIL_TEMPLATE_FAILURE,
  UPDATE_EMAIL_TEMPLATE,
  UPDATE_EMAIL_TEMPLATE_SUCCESS,
  UPDATE_EMAIL_TEMPLATE_FAILURE,
  TOGGLE_INFO_DIALOG,
} from './constants';

export function handleKeyCommand(command) {
  return {
    type: HANDLE_KEY_COMMAND,
    command,
  };
}

export function changeEditor(editorState) {
  return {
    type: CHANGE_EDITOR,
    editorState,
  };
}

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  };
}

export function getEmailTplById() {
  return {
    type: GET_EMAIL_TEMPLATE_BY_ID,
  };
}

export function getEmailTplByIdSuccess(emailTpl) {
  return {
    type: GET_EMAIL_TEMPLATE_BY_ID_SUCCESS,
    emailTpl,
  };
}

export function getEmailTplByIdFailure(error) {
  return {
    type: GET_EMAIL_TEMPLATE_BY_ID_FAILURE,
    error,
  };
}

export function createEmailTpl() {
  return {
    type: CREATE_EMAIL_TEMPLATE,
  };
}

export function createEmailTplSuccess(newEmailTpl) {
  return {
    type: CREATE_EMAIL_TEMPLATE_SUCCESS,
    newEmailTpl,
  };
}

export function createEmailTplFailure(error) {
  return {
    type: CREATE_EMAIL_TEMPLATE_FAILURE,
    error,
  };
}

export function updateEmailTpl() {
  return {
    type: UPDATE_EMAIL_TEMPLATE,
  };
}

export function updateEmailTplSuccess(updatedEmailTpl) {
  return {
    type: UPDATE_EMAIL_TEMPLATE_SUCCESS,
    updatedEmailTpl,
  };
}
export function updateEmailTplFailure(error) {
  return {
    type: UPDATE_EMAIL_TEMPLATE_FAILURE,
    error,
  };
}

export function toggleInfoDialog() {
  return {
    type: TOGGLE_INFO_DIALOG,
  };
}
