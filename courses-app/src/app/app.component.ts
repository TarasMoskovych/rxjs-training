import { Component } from '@angular/core';
import { LoadingService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoadingService],
})
export class AppComponent {
  logout(): void {

  }
}
