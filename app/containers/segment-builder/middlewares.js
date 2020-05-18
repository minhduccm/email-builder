/*
* SegmentBuilder middlewares
*/

import {
  makeCall,
  buildOptions,
  handleSuccess,
  handleFailure,
} from '../../utils/api-call';
import { handleFailureGlobally } from '../App/actions';
import {
  getProfilesList,
  getProfilesListSuccess,
  getProfilesListFailure,
} from './actions';
import { getProfilesListApiRoute } from '../../utils/api-routes';

export function getProfilesListThunk(
  skip,
  limit,
  searchTerm,
  requiredLeanedConds,
  optionalLeanedConds,
) {
  return async (dispatch, getState) => {
    dispatch(getProfilesList());
    try {
      const options = await buildOptions('POST', {
        searchTerm,
        requiredLeanedConds,
        optionalLeanedConds,
      });
      const profilesList = await makeCall(
        dispatch,
        getProfilesListApiRoute(skip, limit),
        options,
      );
      handleSuccess(dispatch, getProfilesListSuccess, profilesList);
    } catch (e) {
      await handleFailure(
        dispatch,
        getProfilesListFailure,
        handleFailureGlobally,
        e,
      );
    }
  };
}
