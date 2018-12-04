import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface AddGroupDialogData {
  port: string;
  stream_type: string;
}

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupComponent implements OnInit {
  portFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddGroupDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
