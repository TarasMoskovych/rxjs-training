import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course, sortCoursesBySeqNo } from '../shared/models';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  beginnerCourses: Course[];
  advancedCourses: Course[];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get('/api/courses')
      .subscribe(
        (res: any) => {
          const courses: Course[] = res.payload.sort(sortCoursesBySeqNo);
          this.beginnerCourses = courses.filter(course => course.category == 'BEGINNER');
          this.advancedCourses = courses.filter(course => course.category == 'ADVANCED');
        });
  }

  editCourse(course: Course): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }
}
