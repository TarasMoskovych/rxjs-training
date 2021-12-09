import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

import { Course } from '@app/shared/models';
import { CourseDialogComponent } from '@app/modules/home/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent {
  @Input() courses: Course[] = [];
  @Input() edit = false;
  @Output() coursesChanged = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  onEditCourse(course: Course): void {
    this.dialog.open(CourseDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: course,
    })
    .afterClosed()
    .pipe(filter((changes: Course) => !!changes))
    .subscribe(() => this.coursesChanged.emit());
  }
}
