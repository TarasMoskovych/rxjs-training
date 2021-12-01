import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoginComponent } from './login/login.component';
import { SearchLessonsComponent } from './search-lessons/search-lessons.component';
import { LoadingService, MessagesService } from './core';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CourseDialogComponent,
    CourseComponent,
    HomeComponent,
    LessonComponent,
    LoginComponent,
    SearchLessonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    LoadingService,
    MessagesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
