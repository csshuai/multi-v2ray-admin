import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { NotificationService, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { AddGroupComponent } from '@app/manage/add-group/add-group.component';
import { AddUserComponent } from '@app/manage/add-user/add-user.component';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  ActionAddGroupRetrieve,
  ActionAddUserRetrieve,
  ActionDeleteGroupRetrieve,
  ActionDeleteUserRetrieve,
  ActionGetGroupsRetrieve,
  ActionManageRetrieve,
  ActionSettingsRetrieve,
  RetrieveType
} from '../manage.actions';
import { GetGroupsState, Group, Groups, User } from '../manage.model';
import { addGroup, addUser, deleteGroup, deleteUser, getGroups, manage, settings, State } from '../manage.state';

class GroupFlatNode {
  constructor(public expandable: boolean, public name: string, public level: number, public type: any) {}
}

function isGroup(node: Group | User): node is Group {
  return (<Group>node).port !== undefined;
}

function cancelBubble() {
  const event = window.event;
  if (event.stopPropagation) {
    // W3C
    event.stopPropagation();
  } else {
    // IE
    event.cancelBubble = true;
  }
}

@Component({
  selector: 'app-service-management',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  groupsTreeControl: FlatTreeControl<GroupFlatNode>;
  groupsTreeFlattener: MatTreeFlattener<Group | User, GroupFlatNode>;
  groupsDataSource: MatTreeFlatDataSource<Group | User, GroupFlatNode>;

  getGroups$: Observable<GetGroupsState>;
  groups: Groups;

  constructor(
    private store: Store<State>,
    private notificationsService: NotificationService,
    private dialog: MatDialog
  ) {}

  transformer = (node: Group | User, level: number) => {
    if (isGroup(node)) {
      return new GroupFlatNode(!!node.node_list, `${node.tag} (${node.port})`, level, node);
    } else {
      return new GroupFlatNode(false, `${node.user_number}: ${node.user_info}`, level, node);
    }
  };

  ngOnInit() {
    this.groupsTreeControl = new FlatTreeControl<GroupFlatNode>(this._getLevel, this._isExpandable);
    this.groupsTreeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );
    this.groupsDataSource = new MatTreeFlatDataSource(this.groupsTreeControl, this.groupsTreeFlattener);

    this.getGroups$ = this.store.pipe(
      select(getGroups),
      tap(x => {
        if (x.groups) {
          this.groups = x.groups;
          this.groupsDataSource.data = this.groups.group_list;
        }
      })
    );
    this.getGroups('new');
    this.store.pipe(select(manage)).subscribe(value => {
      if (value.result) {
        if (value.result.success) {
          this.notificationsService.success(value.result.msg);
        } else {
          this.notificationsService.error(value.result.msg);
        }
      }
    });
    this.store.pipe(select(settings)).subscribe(value => {
      if (value.result) {
        if (value.result.success) {
          this.notificationsService.success(value.result.msg);
        } else {
          this.notificationsService.error(value.result.msg);
        }
      }
    });
    this.store.pipe(select(addGroup)).subscribe(value => {
      if (value.result) {
        if (value.result.success) {
          this.notificationsService.success(value.result.msg);
          this.getGroups();
        } else {
          this.notificationsService.error(value.result.msg);
        }
      }
    });
    this.store.pipe(select(deleteGroup)).subscribe(value => {
      if (value.result) {
        if (value.result.success) {
          this.notificationsService.success(value.result.msg);
          this.getGroups();
        } else {
          this.notificationsService.error(value.result.msg);
        }
      }
    });
    this.store.pipe(select(addUser)).subscribe(value => {
      if (value.result) {
        if (value.result.success) {
          this.notificationsService.success(value.result.msg);
          this.getGroups();
        } else {
          this.notificationsService.error(value.result.msg);
        }
      }
    });
    this.store.pipe(select(deleteUser)).subscribe(value => {
      if (value.result) {
        if (value.result.success) {
          this.notificationsService.success(value.result.msg);
          this.getGroups();
        } else {
          this.notificationsService.error(value.result.msg);
        }
      }
    });
  }

  manage(action: string) {
    this.store.dispatch(new ActionManageRetrieve({ action }));
  }

  changeSettings(modify_type: string, value: boolean) {
    this.store.dispatch(new ActionSettingsRetrieve({ modify_type, value }));
  }

  getGroups(retrieveType: RetrieveType = 'new') {
    this.store.dispatch(new ActionGetGroupsRetrieve({ retrieveType }));
  }

  hasChild = (_: number, _nodeData: GroupFlatNode) => _nodeData.expandable;

  addGroup() {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      minWidth: '300px',
      data: { stream_type: 'srtp' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new ActionAddGroupRetrieve({ ...result }));
      }
    });
  }

  deleteGroup(group: Group) {
    cancelBubble();
    this.store.dispatch(new ActionDeleteGroupRetrieve({ tag: group.tag }));
  }

  editGroup(group: Group) {
    cancelBubble();
    this.notificationsService.info('开发中...');
  }

  addUser(group: Group) {
    cancelBubble();
    const dialogRef = this.dialog.open(AddUserComponent, {
      minWidth: '300px',
      data: { group_tag: group.tag }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new ActionAddUserRetrieve({ ...result }));
      }
    });
  }

  deleteUser(user: User) {
    this.store.dispatch(new ActionDeleteUserRetrieve({ client_index: user.user_number }));
  }

  editUser(user: User) {
    this.notificationsService.info('开发中...');
  }

  private _getLevel = (node: GroupFlatNode) => node.level;

  private _isExpandable = (node: GroupFlatNode) => node.expandable;

  private _getChildren = (node: Group): Observable<User[]> => of(node.node_list);
}
