/**
 * EmailTemplates selectors
 */

import { createSelector } from 'reselect';

const selectEmailTemplates = state => state.emailTemplates; // 'emailTemplates' here should match to registered reducer name in index.js

const makeSelectPagingSkip = () =>
  createSelector(
    selectEmailTemplates,
    emailTemplatesState => emailTemplatesState.pagingSkip,
  );

const makeSelectEmailTemplatesList = () =>
  createSelector(
    selectEmailTemplates,
    emailTemplatesState => emailTemplatesState.emailTemplatesList,
  );

const makeSelectExpandedEmailTplId = () =>
  createSelector(
    selectEmailTemplates,
    emailTemplatesState => emailTemplatesState.expandedEmailTplId,
  );

const makeSelectIsDeletionConfirmationOpened = () =>
  createSelector(
    selectEmailTemplates,
    emailTemplatesState => emailTemplatesState.isDeletionConfirmationOpened,
  );

const makeSelectManipulatingEmailTplId = () =>
  createSelector(
    selectEmailTemplates,
    emailTemplatesState => emailTemplatesState.manipulatingEmailTplId,
  );

export {
  selectEmailTemplates,
  makeSelectPagingSkip,
  makeSelectEmailTemplatesList,
  makeSelectExpandedEmailTplId,
  makeSelectIsDeletionConfirmationOpened,
  makeSelectManipulatingEmailTplId,
};
