import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { Groups, Result } from './manage.model';

export type RetrieveType = 'new' | 'refresh' | 'more';

// manage
export enum ManageActionTypes {
  RETRIEVE = '[Manage] Retrieve',
  RETRIEVE_SUCCESS = '[Manage] Retrieve Success'
}

export class ActionManageRetrieve implements Action {
  readonly type = ManageActionTypes.RETRIEVE;

  constructor(readonly payload: { action: string }) {}
}

export class ActionManageRetrieveSuccess implements Action {
  readonly type = ManageActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { action: string; result: Result<any> }) {}
}

export type ManageActions = ActionManageRetrieve | ActionManageRetrieveSuccess;

// settings
export enum SettingsActionTypes {
  RETRIEVE = '[Settings] Retrieve',
  RETRIEVE_SUCCESS = '[Settings] Retrieve Success'
}

export class ActionSettingsRetrieve implements Action {
  readonly type = SettingsActionTypes.RETRIEVE;

  constructor(readonly payload: { modify_type: string; value: any }) {}
}

export class ActionSettingsRetrieveSuccess implements Action {
  readonly type = SettingsActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { modify_type: string; result: Result<any> }) {}
}

export type SettingsActions = ActionSettingsRetrieve | ActionSettingsRetrieveSuccess;

// GetGroups
export enum GetGroupsActionTypes {
  RETRIEVE = '[GetGroups] Retrieve',
  RETRIEVE_SUCCESS = '[GetGroups] Retrieve Success',
  RETRIEVE_ERROR = '[GetGroups] Retrieve Error'
}

export class ActionGetGroupsRetrieve implements Action {
  readonly type = GetGroupsActionTypes.RETRIEVE;

  constructor(readonly payload: { retrieveType: RetrieveType }) {}
}

export class ActionGetGroupsRetrieveSuccess implements Action {
  readonly type = GetGroupsActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { groups: Groups }) {}
}

export class ActionGetGroupsRetrieveError implements Action {
  readonly type = GetGroupsActionTypes.RETRIEVE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) {}
}

export type GetGroupsActions = ActionGetGroupsRetrieve | ActionGetGroupsRetrieveSuccess | ActionGetGroupsRetrieveError;

// AddGroup
export enum AddGroupActionTypes {
  RETRIEVE = '[AddGroup] Retrieve',
  RETRIEVE_SUCCESS = '[AddGroup] Retrieve Success'
}

export class ActionAddGroupRetrieve implements Action {
  readonly type = AddGroupActionTypes.RETRIEVE;

  constructor(readonly payload: { port: string; stream_type: string; data: {} }) {}
}

export class ActionAddGroupRetrieveSuccess implements Action {
  readonly type = AddGroupActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { result: Result<any> }) {}
}

export type AddGroupActions = ActionAddGroupRetrieve | ActionAddGroupRetrieveSuccess;

// EditGroup
export enum EditGroupActionTypes {
  RETRIEVE = '[EditGroup] Retrieve',
  RETRIEVE_SUCCESS = '[EditGroup] Retrieve Success'
}

export class ActionEditGroupRetrieve implements Action {
  readonly type = EditGroupActionTypes.RETRIEVE;

  constructor(
    readonly payload: {
      groupTag: string;
      streamBody: { stream_type: string; data: {} };
      groupBody: { modify_type: string; value: {} };
    }
  ) {}
}

export class ActionEditGroupRetrieveSuccess implements Action {
  readonly type = EditGroupActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { result: Result<any> }) {}
}

export type EditGroupActions = ActionEditGroupRetrieve | ActionEditGroupRetrieveSuccess;

// DeleteGroup
export enum DeleteGroupActionTypes {
  RETRIEVE = '[DeleteGroup] Retrieve',
  RETRIEVE_SUCCESS = '[DeleteGroup] Retrieve Success'
}

export class ActionDeleteGroupRetrieve implements Action {
  readonly type = DeleteGroupActionTypes.RETRIEVE;

  constructor(readonly payload: { tag: string }) {}
}

export class ActionDeleteGroupRetrieveSuccess implements Action {
  readonly type = DeleteGroupActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { result: Result<any> }) {}
}

export type DeleteGroupActions = ActionDeleteGroupRetrieve | ActionDeleteGroupRetrieveSuccess;

// AddUser
export enum AddUserActionTypes {
  RETRIEVE = '[AddUser] Retrieve',
  RETRIEVE_SUCCESS = '[AddUser] Retrieve Success',
  RETRIEVE_ERROR = '[AddUser] Retrieve Error'
}

export class ActionAddUserRetrieve implements Action {
  readonly type = AddUserActionTypes.RETRIEVE;

  constructor(readonly payload: { email: string; group_tag: string }) {}
}

export class ActionAddUserRetrieveSuccess implements Action {
  readonly type = AddUserActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { result: Result<any> }) {}
}

export class ActionAddUserRetrieveError implements Action {
  readonly type = AddUserActionTypes.RETRIEVE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) {}
}

export type AddUserActions = ActionAddUserRetrieve | ActionAddUserRetrieveSuccess | ActionAddUserRetrieveError;

// EditUser
export enum EditUserActionTypes {
  RETRIEVE = '[EditUser] Retrieve',
  RETRIEVE_SUCCESS = '[EditUser] Retrieve Success'
}

export class ActionEditUserRetrieve implements Action {
  readonly type = EditUserActionTypes.RETRIEVE;

  constructor(
    readonly payload: {
      clientIndex: number;
      email: string | null;
      aid: number | null;
      uuid: string | null;
    }
  ) {}
}

export class ActionEditUserRetrieveSuccess implements Action {
  readonly type = EditUserActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { result: Result<any> }) {}
}

export type EditUserActions = ActionEditUserRetrieve | ActionEditUserRetrieveSuccess;

// DeleteUser
export enum DeleteUserActionTypes {
  RETRIEVE = '[DeleteUser] Retrieve',
  RETRIEVE_SUCCESS = '[DeleteUser] Retrieve Success'
}

export class ActionDeleteUserRetrieve implements Action {
  readonly type = DeleteUserActionTypes.RETRIEVE;

  constructor(readonly payload: { client_index: number }) {}
}

export class ActionDeleteUserRetrieveSuccess implements Action {
  readonly type = DeleteUserActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { result: Result<any> }) {}
}

export type DeleteUserActions = ActionDeleteUserRetrieve | ActionDeleteUserRetrieveSuccess;
