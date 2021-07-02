import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  DialogBoxComponent,
  DialogType
} from '../dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  getRoutine() {
    return this.http.get(`${environment.apiEndPoint}/routine`);
  }

  addRoutine(body: any) {
    return this.http.post(`${environment.apiEndPoint}/routine/create`, body);
  }

  editRoutine(body: any) {
    return this.http.patch(`${environment.apiEndPoint}/routine/update`, body);
  }

  deleteRoutine(body: any) {
    return this.http.delete(
      `${environment.apiEndPoint}/routine/delete/${body._id}`
    );
  }

  openAddRoutineDialog(): MatDialogRef<DialogBoxComponent> {
    return this.dialog.open(DialogBoxComponent, {
      width: '350px',
      height: '300px',
      data: {
        type: DialogType.Add
      }
    });
  }

  openEditRoutineDialog(data: any): MatDialogRef<DialogBoxComponent> {
    return this.dialog.open(DialogBoxComponent, {
      width: '350px',
      height: '300px',
      data: {
        type: DialogType.Edit,
        ...data
      }
    });
  }

  openDeleteRoutineDialog(data: any): MatDialogRef<DialogBoxComponent> {
    return this.dialog.open(DialogBoxComponent, {
      width: '350px',
      height: '200px',
      data: {
        type: DialogType.Confirm,
        ...data
      }
    });
  }
}
