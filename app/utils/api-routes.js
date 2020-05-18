/*
* api routes
*/

import { buildApiServer } from './api-call';

export function getProfilesListApiRoute(skip, limit) {
  return `${buildApiServer()}/profiles?skip=${skip}&limit=${limit}`;
}

export function getEmailTplsListApiRoute(skip, limit) {
  return `${buildApiServer()}/email-templates?skip=${skip}&limit=${limit}`;
}

export function getEmailTplByIdApiRoute(emailTplId) {
  return `${buildApiServer()}/email-templates/${emailTplId}`;
}

export function getDeleteEmailTplByIdApiRoute(emailTplId) {
  return `${buildApiServer()}/email-templates/${emailTplId}`;
}

export function getCreateEmailTplApiRoute() {
  return `${buildApiServer()}/email-templates`;
}

export function getUpdateEmailTplApiRoute(emailTplId) {
  return `${buildApiServer()}/email-templates/${emailTplId}`;
}
