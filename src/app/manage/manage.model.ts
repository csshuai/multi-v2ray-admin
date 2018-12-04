import { HttpErrorResponse } from '@angular/common/http';

export interface Result<T> {
  data: T;
  msg: string;
  success: boolean;
}

export interface ResultState<T> {
  loading: boolean;
  result?: Result<T>;
  error?: HttpErrorResponse;
}

export interface GetGroupsState {
  loading: boolean;
  groups?: Groups;
  error?: HttpErrorResponse;
}

export interface Groups {
  ban_bt: boolean;
  group_list: Group[];
  modify_time: number;
  path: string;
  stats: Stats;
  userNumber: number; // user_number
}

export interface Group {
  ip: string;
  port: string;
  end_port: string;
  tag: string;
  node_list: User[];
  tfo: string;
  tls: string;
  dyp: Dyp;
  protocol: string;
  index: number;
}

export interface User {
  user_number: number;
  _User__password: string;
  user_info: string;
  alter_id: number;
  network: string;
  path: string;
  host: string;
  header: string;
}

export interface Dyp {
  status: boolean;
  aid: number;
}

export interface Stats {
  status: boolean;
  door_port: number;
}
