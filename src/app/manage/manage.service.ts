import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';

import { Groups, Result } from './manage.model';

@Injectable()
export class ManageService {
  constructor(private httpClient: HttpClient) {}

  manage(action: string): Observable<Result<any>> {
    return this.httpClient.post<Result<any>>(`${env.host}/manage/${action}`, null);
  }

  settings(body: { modify_type: string; value: any }): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${env.host}/global`, body);
  }

  /**
   * 获取节点列表
   */
  getGroups(): Observable<Groups> {
    return this.httpClient.get<Groups>(`${env.host}/list`);
  }

  addGroup(body: { port: string; stream_type: string; data: {} }): Observable<Result<any>> {
    return this.httpClient.post<Result<any>>(`${env.host}/group`, body);
  }

  editStream(groupTag: string, body: { stream_type: string; data: {} }): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${env.host}/stream/${groupTag}`, body);
  }

  editGroup(groupTag: string, body: { modify_type: string; value: {} }): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${env.host}/group/${groupTag}`, body);
  }

  deleteGroup(groupTag: string): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${env.host}/group/${groupTag}`);
  }

  addUser(body: { email: string; group_tag: string }): Observable<Result<any>> {
    return this.httpClient.post<Result<any>>(`${env.host}/user`, body);
  }

  editUser(clientIndex: number, body: { modify_type: string; value: {} }): Observable<Result<any>> {
    return this.httpClient.put<Result<any>>(`${env.host}/user/${clientIndex}`, body);
  }

  deleteUser(clientIndex: number): Observable<Result<any>> {
    return this.httpClient.delete<Result<any>>(`${env.host}/user/${clientIndex}`);
  }
}
