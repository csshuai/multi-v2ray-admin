import {
  AddGroupActions,
  AddGroupActionTypes,
  AddUserActions,
  AddUserActionTypes,
  DeleteGroupActions,
  DeleteGroupActionTypes,
  DeleteUserActions,
  DeleteUserActionTypes,
  EditGroupActions,
  EditGroupActionTypes,
  EditUserActions,
  EditUserActionTypes,
  GetGroupsActions,
  GetGroupsActionTypes,
  ManageActions,
  ManageActionTypes,
  SettingsActions,
  SettingsActionTypes
} from './manage.actions';
import { GetGroupsState, ResultState } from './manage.model';

export function manageReducer(state: ResultState<any> = { loading: false }, action: ManageActions) {
  switch (action.type) {
    case ManageActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case ManageActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function settingsReducer(state: ResultState<any> = { loading: false }, action: SettingsActions) {
  switch (action.type) {
    case SettingsActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case SettingsActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function getGroupsReducer(state: GetGroupsState = { loading: false }, action: GetGroupsActions) {
  switch (action.type) {
    case GetGroupsActionTypes.RETRIEVE:
      return {
        ...state,
        loading: action.payload.retrieveType === 'new',
        error: null,
        groups: null
      };
    case GetGroupsActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        groups: action.payload.groups
      };
    case GetGroupsActionTypes.RETRIEVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        groups: null
      };
    default:
      return state;
  }
}

export function addGroupReducer(state: ResultState<any> = { loading: false }, action: AddGroupActions) {
  switch (action.type) {
    case AddGroupActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case AddGroupActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function editGroupReducer(state: ResultState<any> = { loading: false }, action: EditGroupActions) {
  switch (action.type) {
    case EditGroupActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case EditGroupActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function deleteGroupReducer(state: ResultState<any> = { loading: false }, action: DeleteGroupActions) {
  switch (action.type) {
    case DeleteGroupActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case DeleteGroupActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function addUserReducer(state: ResultState<any> = { loading: false }, action: AddUserActions) {
  switch (action.type) {
    case AddUserActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case AddUserActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function editUserReducer(state: ResultState<any> = { loading: false }, action: EditUserActions) {
  switch (action.type) {
    case EditUserActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case EditUserActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}

export function deleteUserReducer(state: ResultState<any> = { loading: false }, action: DeleteUserActions) {
  switch (action.type) {
    case DeleteUserActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        result: null
      };
    case DeleteUserActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.result
      };
    default:
      return state;
  }
}
