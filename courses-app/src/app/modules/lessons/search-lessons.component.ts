import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoursesService } from '@app/core';
import { Lesson } from '@app/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-lessons',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLessonsComponent {
  searchResults$: Observable<Lesson[]>;
  selectedLesson: Lesson;

  constructor(private coursesService: CoursesService) { }

  onSearch(search: string): void {
    this.searchResults$ = this.coursesService.searchLessons(search);
  }

  onSelectLesson(lesson: Lesson): void {
    this.selectedLesson = lesson;
  }
}
