import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import {
  ActionAddGroupRetrieve,
  ActionAddGroupRetrieveSuccess,
  ActionAddUserRetrieve,
  ActionAddUserRetrieveError,
  ActionAddUserRetrieveSuccess,
  ActionDeleteGroupRetrieve,
  ActionDeleteGroupRetrieveSuccess,
  ActionDeleteUserRetrieve,
  ActionDeleteUserRetrieveSuccess,
  ActionGetGroupsRetrieve,
  ActionGetGroupsRetrieveError,
  ActionGetGroupsRetrieveSuccess,
  ActionManageRetrieve,
  ActionManageRetrieveSuccess,
  ActionSettingsRetrieve,
  ActionSettingsRetrieveSuccess,
  AddGroupActionTypes,
  AddUserActionTypes,
  DeleteGroupActionTypes,
  DeleteUserActionTypes,
  GetGroupsActionTypes,
  ManageActionTypes,
  SettingsActionTypes
} from './manage.actions';
import { ManageService } from './manage.service';

@Injectable()
export class ManageEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: ManageService
  ) {}

  @Effect()
  manage = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionManageRetrieve>(ManageActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action =>
        this.service.manage(action.payload.action).pipe(
          map(
            result =>
              new ActionManageRetrieveSuccess({
                action: action.payload.action,
                result
              })
          ),
          catchError(() => of({ type: 'ignore error' }))
        )
      )
    );

  @Effect()
  settings = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionSettingsRetrieve>(SettingsActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action =>
        this.service.settings(action.payload).pipe(
          map(
            result =>
              new ActionSettingsRetrieveSuccess({
                modify_type: action.payload.modify_type,
                result
              })
          ),
          catchError(() => of({ type: 'ignore error' }))
        )
      )
    );

  @Effect()
  getGroups = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionGetGroupsRetrieve>(GetGroupsActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(() =>
        this.service.getGroups().pipe(
          map(groups => new ActionGetGroupsRetrieveSuccess({ groups })),
          catchError(error => of(new ActionGetGroupsRetrieveError({ error })))
        )
      )
    );

  @Effect()
  addGroup = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionAddGroupRetrieve>(AddGroupActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action =>
        this.service.addGroup({ ...action.payload }).pipe(
          map(result => new ActionAddGroupRetrieveSuccess({ result })),
          catchError(() => of({ type: 'ignore error' }))
        )
      )
    );

  @Effect()
  deleteGroup = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionDeleteGroupRetrieve>(DeleteGroupActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action =>
        this.service.deleteGroup(action.payload.tag).pipe(
          map(result => new ActionDeleteGroupRetrieveSuccess({ result })),
          catchError(() => of({ type: 'ignore error' }))
        )
      )
    );

  @Effect()
  addUser = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionAddUserRetrieve>(AddUserActionTypes.RETRIEVE),
      distinctUntilChanged(
        (x, y) => x.payload.email === y.payload.email && x.payload.group_tag === y.payload.group_tag
      ),
      debounceTime(debounce, scheduler),
      switchMap(action =>
        this.service.addUser(action.payload).pipe(
          map(result => new ActionAddUserRetrieveSuccess({ result })),
          catchError(error => of(new ActionAddUserRetrieveError({ error })))
        )
      )
    );

  @Effect()
  deleteUser = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionDeleteUserRetrieve>(DeleteUserActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action =>
        this.service.deleteUser(action.payload.client_index).pipe(
          map(result => new ActionDeleteUserRetrieveSuccess({ result })),
          catchError(() => of({ type: 'ignore error' }))
        )
      )
    );
}
