import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core';
import { Result } from '@app/manage/manage.model';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, of, zip } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ObservableInput } from 'rxjs/src/internal/types';

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
  ActionEditGroupRetrieve,
  ActionEditGroupRetrieveSuccess,
  ActionEditUserRetrieve,
  ActionEditUserRetrieveSuccess,
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
  EditGroupActionTypes,
  EditUserActionTypes,
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
  editGroup = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionEditGroupRetrieve>(EditGroupActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action => {
        const tag = action.payload.groupTag;
        const streamBody = action.payload.streamBody;
        const groupBody = action.payload.groupBody;
        return zip(this.service.editStream(tag, streamBody), this.service.editGroup(tag, groupBody)).pipe(
          map(results => {
            let result: Result<any> = results[0];
            for (const temp of results) {
              if (!temp.success) {
                result = temp;
                break;
              }
            }
            return new ActionEditGroupRetrieveSuccess({ result });
          }),
          catchError(() => of({ type: 'ignore error' }))
        );
      })
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
  editUser = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionEditUserRetrieve>(EditUserActionTypes.RETRIEVE),
      debounceTime(debounce, scheduler),
      switchMap(action => {
        const array: ObservableInput<any>[] = [];
        const clientIndex = action.payload.clientIndex;
        if (action.payload.email) {
          const body = { modify_type: 'email', value: action.payload.email };
          array.push(this.service.editUser(clientIndex, body));
        }
        if (action.payload.uuid) {
          const body = { modify_type: 'uuid', value: action.payload.uuid };
          array.push(this.service.editUser(clientIndex, body));
        }
        if (action.payload.aid) {
          const body = { modify_type: 'aid', value: action.payload.aid };
          array.push(this.service.editUser(clientIndex, body));
        }
        return zip(...array).pipe(
          map(results => {
            let result: Result<any> = results[0];
            for (const temp of results) {
              if (!temp.success) {
                result = temp;
                break;
              }
            }
            return new ActionEditUserRetrieveSuccess({ result });
          }),
          catchError(() => of({ type: 'ignore error' }))
        );
      })
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
