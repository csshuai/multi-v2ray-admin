import { AppState } from '@app/core';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { GetGroupsState, ResultState } from './manage.model';
import {
  addGroupReducer,
  addUserReducer,
  deleteGroupReducer,
  deleteUserReducer,
  getGroupsReducer,
  manageReducer,
  settingsReducer
} from './manage.reducer';

export interface ManageState {
  manage: ResultState<any>;
  settings: ResultState<any>;
  getGroups: GetGroupsState;
  addGroup: ResultState<any>;
  deleteGroup: ResultState<any>;
  addUser: ResultState<any>;
  deleteUser: ResultState<any>;
}

export interface State extends AppState {
  manage: ManageState;
}

export const MANAGE_NAME = 'manage';
export const selectManage = createFeatureSelector<State, ManageState>(MANAGE_NAME);
export const reducers: ActionReducerMap<ManageState> = {
  manage: manageReducer,
  settings: settingsReducer,
  getGroups: getGroupsReducer,
  addGroup: addGroupReducer,
  deleteGroup: deleteGroupReducer,
  addUser: addUserReducer,
  deleteUser: deleteUserReducer
};

export const manage = createSelector(
  selectManage,
  (state: ManageState) => state.manage
);

export const settings = createSelector(
  selectManage,
  (state: ManageState) => state.settings
);

export const getGroups = createSelector(
  selectManage,
  (state: ManageState) => state.getGroups
);

export const addGroup = createSelector(
  selectManage,
  (state: ManageState) => state.addGroup
);

export const deleteGroup = createSelector(
  selectManage,
  (state: ManageState) => state.deleteGroup
);

export const addUser = createSelector(
  selectManage,
  (state: ManageState) => state.addUser
);

export const deleteUser = createSelector(
  selectManage,
  (state: ManageState) => state.deleteUser
);
