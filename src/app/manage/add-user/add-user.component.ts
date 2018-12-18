import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '@app/manage/manage.model';
import { v4 as uuid } from 'uuid';

export interface AddUserDialogData {
  group_tag: string;
  protocol: string;
  user: User;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {
  form = this.fb.group({
    group_tag: [this.data.group_tag, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserDialogData
  ) {}

  ngOnInit() {
    if (this.data.protocol === 'Socks') {
      let user = '';
      let pass = uuid();
      if (!this.isNew()) {
        user = this.data.user.user_info;
        pass = this.data.user._User__password;
      }
      this.form.setControl(
        'data',
        new FormGroup({
          user: new FormControl(user, Validators.required),
          pass: new FormControl(pass, Validators.required)
        })
      );
    } else {
      let email = '';
      let _uuid = uuid();
      let aid = 64;
      if (!this.isNew()) {
        email = this.data.user.user_info;
        _uuid = this.data.user._User__password;
        aid = this.data.user.alter_id;
      }
      this.form.setControl(
        'data',
        new FormGroup({
          email: new FormControl(email, [Validators.required, Validators.email]),
          uuid: new FormControl(_uuid, Validators.required),
          aid: new FormControl(aid, Validators.required)
        })
      );
    }
  }

  isNew() {
    return !this.data.user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
