import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum DialogType {
  Add = '[Form] Add',
  Edit = '[Form] Edit',
  Confirm = 'CONFIRM'
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  addForm!: FormGroup;
  showFormDialog!: boolean;
  showConfirmDialog!: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.type === DialogType.Add) {
      this.showFormDialog = true;
      this.addForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        completed: new FormControl()
      });
      this.addForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        completed: this.data.completed
      });
    } else if (this.data.type === DialogType.Edit) {
      this.showFormDialog = true;
      this.addForm = new FormGroup({
        title: new FormControl(this.data.title, [Validators.required]),
        description: new FormControl(this.data.description, [
          Validators.required
        ]),
        completed: new FormControl(this.data.completed ? '1' : '0')
      });
    } else if (this.data.type === DialogType.Confirm) {
      this.showConfirmDialog = true;
    }
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.dialogRef.close({
        data: {
          ...this.addForm.value,
          completed: this.addForm.value.completed === '1' ? true : false,
          _id: this.data._id
        }
      });
    }
  }

  deleteRoutine() {
    this.dialogRef.close({
      data: { ...this.data }
    });
  }
}
