import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from 'src/app/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
