import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SafeUrlPipe } from './pipes';
import {
  CoursesCardListComponent,
  LoadingComponent,
  MessagesComponent,
} from './components';

@NgModule({
  declarations: [
    CoursesCardListComponent,
    LoadingComponent,
    MessagesComponent,
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    CoursesCardListComponent,
    LoadingComponent,
    MessagesComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    SafeUrlPipe,
  ],
})
export class SharedModule { }
