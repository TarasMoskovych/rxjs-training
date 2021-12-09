import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lesson } from '@app/shared/models';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent {
  @Input() lesson: Lesson;

  get videoSrc(): string {
    return `https://www.youtube.com/embed/${this.lesson.videoId}`;
  }
}
