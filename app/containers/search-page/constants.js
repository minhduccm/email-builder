/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SEARCH = 'devbowl/SearchPage/SEARCH';
export const SEARCH_SUCCESS = 'devbowl/SearchPage/SEARCH_SUCCESS';
export const GET_PROFILES_LIST = 'devbowl/SearchPage/GET_PROFILES_LIST';
export const GET_PROFILES_LIST_SUCCESS = 'devbowl/SearchPage/GET_PROFILES_LIST_SUCCESS';
export const GET_PROFILES_LIST_FAILURE = 'devbowl/SearchPage/GET_PROFILES_LIST_FAILURE';