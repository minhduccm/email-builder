/*
 * EmailBuilder selectors
 */

import { createSelector } from 'reselect';

const selectEmailBuidler = state => state.emailBuidler; // 'emailBuidler' here should match to registered reducer name in index.js

const makeSelectEditorState = () =>
  createSelector(
    selectEmailBuidler,
    emailBuidlerState => emailBuidlerState.editorState,
  );

const makeSelectEmailTplId = () =>
  createSelector(
    selectEmailBuidler,
    emailBuidlerState => emailBuidlerState.emailTplId,
  );

const makeSelectTitle = () =>
  createSelector(
    selectEmailBuidler,
    emailBuidlerState => emailBuidlerState.title,
  );

const makeSelectIsInfoDialogOpened = () =>
  createSelector(
    selectEmailBuidler,
    emailBuidlerState => emailBuidlerState.isInfoDialogOpened,
  );

export {
  selectEmailBuidler,
  makeSelectEditorState,
  makeSelectEmailTplId,
  makeSelectTitle,
  makeSelectIsInfoDialogOpened,
};
