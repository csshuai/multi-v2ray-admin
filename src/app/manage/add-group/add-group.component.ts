import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Group } from '@app/manage/manage.model';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupComponent implements OnInit {
  form = this.fb.group({
    port: [this._defaultPort(), [Validators.required]],
    stream_type: [this._defaultStreamType(), [Validators.required]]
  });
  private addStreamTypes = ['utp', 'srtp', 'dtls', 'wechat', 'wireguard', 'mtproto', 'socks', 'ss'];
  private editStreamTypes = ['tcp', 'tcp_host', 'kcp', 'h2', 'ws', ...this.addStreamTypes, 'quic'];
  streamTypes = this.data === null ? this.addStreamTypes : this.editStreamTypes;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group | null
  ) {}

  ngOnInit() {
    this.onStreamTypeSelect({ value: this.form.get('stream_type').value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onStreamTypeSelect({ value: stream_type }) {
    if (stream_type === 'socks') {
      let name = '';
      let password = uuid();
      if (this.data && this._streamType() === stream_type) {
        const user = this.data.node_list[0];
        name = user.user_info;
        password = user._User__password;
      }
      this.form.setControl(
        'data',
        new FormGroup({
          user: new FormControl(name, Validators.required),
          pass: new FormControl(password, Validators.required)
        })
      );
    } else if (stream_type === 'ss') {
      let method = 'aes-256-cfb';
      let password = uuid();
      if (this.data && this._streamType() === stream_type) {
        const user = this.data.node_list[0];
        method = user.method;
        password = user._User__password;
      }
      this.form.setControl(
        'data',
        new FormGroup({
          // method: "aes-256-cfb"|"aes-128-cfb"|"chacha20"|"chacha20-ietf"|"aes-256-gcm"|"aes-128-gcm"|"chacha20-poly1305"
          method: new FormControl(method, Validators.required),
          password: new FormControl(password, Validators.required)
        })
      );
    } else if (stream_type === 'tcp_host' || stream_type === 'ws') {
      let host = 'server.cc';
      if (this.data && this._streamType() === stream_type) {
        const user = this.data.node_list[0];
        host = user.host;
      }
      this.form.setControl(
        'data',
        new FormGroup({
          host: new FormControl(host, Validators.required)
        })
      );
    } else if (stream_type === 'quic') {
      let security = 'none';
      let key = uuid();
      let header = 'none';
      if (this.data && this._streamType() === stream_type) {
        const quic = this.data.node_list[0].quic;
        security = quic.security;
        key = quic.key;
        header = quic.header;
      }
      this.form.setControl(
        'data',
        new FormGroup({
          // security: "none" | "aes-128-gcm" | "chacha20-poly1305"
          security: new FormControl(security, Validators.required),
          key: new FormControl(key, Validators.required),
          // header: # 伪装头, 可取值("none"|"srtp"|"utp"|"wechat-video"|"dtls"|"wireguard")
          header: new FormControl(header, Validators.required)
        })
      );
    } else {
      this.form.removeControl('data');
    }
  }

  private _defaultPort() {
    if (this.data) {
      return this.data.port;
    }
    return 443;
  }

  private _defaultStreamType() {
    if (this.data) {
      return this._streamType();
    }
    return 'srtp';
  }

  private _streamType() {
    if (this.data.protocol === 'Vmess') {
      const user = this.data.node_list[0];
      if (user.header) {
        if (user.header === 'http' && user.network === 'tcp') {
          return 'tcp_host';
        } else {
          return user.header;
        }
      } else {
        return user.network;
      }
    } else {
      return this.data.protocol.toLowerCase();
    }
  }
}
