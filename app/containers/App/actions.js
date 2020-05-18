
import { HANDLE_FAILURE_GLOBALLY } from './constants';

export function handleFailureGlobally(error) {
  return {
    type: HANDLE_FAILURE_GLOBALLY,
    error,
  };
}