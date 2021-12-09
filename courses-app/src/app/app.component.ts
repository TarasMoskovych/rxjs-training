import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStoreService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public authService: AuthStoreService) {}

  logout(): void {
    this.authService.logout();
  }
}
