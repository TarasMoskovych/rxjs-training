import { Component, OnInit } from '@angular/core';
import { Course, Lesson } from '../shared/models';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Lesson[];

  constructor() { }

  ngOnInit(): void {
  }

}
