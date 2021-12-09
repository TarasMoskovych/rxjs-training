import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('@app/modules/home/home.module').then(
      (t) => t.HomeModule,
    ),
  },
  {
    path: 'search-lessons',
    loadChildren: () =>
    import('@app/modules/lessons/lessons.module').then(
      (t) => t.LessonsModule,
    ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('@app/modules/about/about.module').then(
        (t) => t.AboutModule,
      ),
  },
  {
    path: 'courses/:courseId',
    loadChildren: () =>
    import('@app/modules/courses/courses.module').then(
      (t) => t.CoursesModule,
    ),
  },
  {
    path: 'login',
    loadChildren: () =>
    import('@app/modules/login/login.module').then(
      (t) => t.LoginModule,
    ),
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
