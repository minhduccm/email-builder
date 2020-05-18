/*
 * EmailBuilder reducer
 */

import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
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

// The initial state of the EmailBuilder
export const initialState = {
  error: null,
  emailTplId: '',
  title: '',
  editorState: EditorState.createEmpty(),
  isInfoDialogOpened: false,
};

function handleKeyCommand(state, action) {
  const newEditorState = RichUtils.handleKeyCommand(
    state.editorState,
    action.command,
  );
  if (newEditorState === null) {
    return state;
  }
  return {
    ...state,
    editorState: newEditorState,
  };
}

function changeEditor(state, action) {
  console.log('changeEditor...');
  return {
    ...state,
    editorState: action.editorState,
  };
}

function handleGetEmailTplByIdSuccess(state, action) {
  const { emailTpl } = action;
  if (!emailTpl) {
    return state;
  }
  const emailTplContent = JSON.parse(emailTpl.content);
  return {
    ...state,
    emailTplId: emailTpl.emailTplId,
    title: emailTpl.title,
    editorState: EditorState.createWithContent(convertFromRaw(emailTplContent)),
    error: null,
  };
}

function emailBuilderReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_KEY_COMMAND:
      return handleKeyCommand(state, action);

    case CHANGE_EDITOR:
      return changeEditor(state, action);

    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };

    case GET_EMAIL_TEMPLATE_BY_ID:
      return state;

    case GET_EMAIL_TEMPLATE_BY_ID_SUCCESS:
      return handleGetEmailTplByIdSuccess(state, action);

    case GET_EMAIL_TEMPLATE_BY_ID_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case CREATE_EMAIL_TEMPLATE:
      return state;

    case CREATE_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: null,
        // emailTplId: action.newEmailTpl.emailTplId,
        isInfoDialogOpened: true,
      };

    case CREATE_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case UPDATE_EMAIL_TEMPLATE:
      return state;

    case UPDATE_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case UPDATE_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case TOGGLE_INFO_DIALOG:
      return {
        ...state,
        isInfoDialogOpened: !state.isInfoDialogOpened,
      };

    default:
      return state;
  }
}

export default emailBuilderReducer;
