import { Component } from '@angular/core';
import { LoadingService, MessagesService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoadingService, MessagesService],
})
export class AppComponent {
  logout(): void {

  }
}
