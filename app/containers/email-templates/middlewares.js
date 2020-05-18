/*
* EmailTemplates middlewares
*/

import {
  makeCall,
  buildOptions,
  handleSuccess,
  handleFailure,
} from '../../utils/api-call';
import { handleFailureGlobally } from '../App/actions';
import {
  getEmailTemplatesList,
  getEmailTemplatesListSuccess,
  getEmailTemplatesListFailure,
  deleteEmailTemplate,
  deleteEmailTemplateSuccess,
  deleteEmailTemplateFailure,
} from './actions';
import {
  getEmailTplsListApiRoute,
  getDeleteEmailTplByIdApiRoute,
} from '../../utils/api-routes';

export function getEmailTemplatesListThunk(skip, limit, isLoadingMore) {
  return async (dispatch, getState) => {
    dispatch(getEmailTemplatesList());
    try {
      const options = await buildOptions('GET');
      const emailTplsList = await makeCall(
        dispatch,
        getEmailTplsListApiRoute(skip, limit),
        options,
      );
      handleSuccess(dispatch, getEmailTemplatesListSuccess, {
        emailTplsList,
        isLoadingMore,
      });
    } catch (e) {
      await handleFailure(
        dispatch,
        getEmailTemplatesListFailure,
        handleFailureGlobally,
        e,
      );
    }
  };
}

export function deleteEmailTemplateThunk(emailTplId) {
  return async (dispatch, getState) => {
    dispatch(deleteEmailTemplate());
    try {
      const options = await buildOptions('DELETE');
      await makeCall(
        dispatch,
        getDeleteEmailTplByIdApiRoute(emailTplId),
        options,
      );
      handleSuccess(dispatch, deleteEmailTemplateSuccess, emailTplId);
    } catch (e) {
      console.log(e);
      await handleFailure(
        dispatch,
        deleteEmailTemplateFailure,
        handleFailureGlobally,
        e,
      );
    }
  };
}
