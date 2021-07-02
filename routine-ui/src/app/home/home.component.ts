import { Component, OnInit } from '@angular/core';
import { RoutineService } from '../services/routine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'routine-ui';
  routineDate: any;
  isLoading!: boolean;

  constructor(private routineService: RoutineService) {}

  ngOnInit() {
    this.getRoutine();
  }
  getRoutine() {
    this.isLoading = true;
    this.routineService.getRoutine().subscribe(res => {
      this.isLoading = false;
      this.routineDate = res;
    });
  }

  addRoutineModal() {
    const addDialogRef = this.routineService.openAddRoutineDialog();
    addDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.routineService.addRoutine(value.data).subscribe(res => {
          this.getRoutine();
        });
      }
    });
  }

  editRoutineModal(routine: any) {
    const editDialogRef = this.routineService.openEditRoutineDialog(routine);
    editDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.routineService.editRoutine(value.data).subscribe(res => {
          this.getRoutine();
        });
      }
    });
  }

  deleteRoutineModal(routine: any) {
    const deleteDialogRef =
      this.routineService.openDeleteRoutineDialog(routine);
    deleteDialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.routineService.deleteRoutine(value.data).subscribe(res => {
          this.getRoutine();
        });
      }
    });
  }
}
