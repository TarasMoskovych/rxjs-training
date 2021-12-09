import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@app/core';
import { fade } from '@app/shared/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade],
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
