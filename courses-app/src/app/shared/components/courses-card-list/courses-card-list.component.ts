import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent {
  @Input() courses: Course[] = [];
  @Output() editCourse = new EventEmitter<Course>();

  onEditCourse(course: Course): void {
    this.editCourse.emit(course);
  }
}
