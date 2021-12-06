import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesService } from '../core';
import { Lesson } from '../shared/models';

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
