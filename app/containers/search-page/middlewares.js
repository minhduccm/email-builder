import {
  makeCall,
  buildOptions,
  handleSuccess,
  handleFailure
} from '../../utils/api-call';
import { handleFailureGlobally } from '../App/actions';
import { getProfilesList, getProfilesListSuccess, getProfilesListFailure } from './actions';
import { getProfilesListApiRoute } from '../../utils/api-routes';

export function getProfilesListThunk(skip, limit) {
  return async (dispatch, getState) => {
    dispatch(getProfilesList());
    try {
      const options = await buildOptions();
      const profilesList = await makeCall(dispatch, getProfilesListApiRoute(), options);
      handleSuccess(dispatch, getProfilesListSuccess, profilesList);
    }
    catch(e) {
      await handleFailure(dispatch, getProfilesListFailure, handleFailureGlobally, e);
    }
  };
}