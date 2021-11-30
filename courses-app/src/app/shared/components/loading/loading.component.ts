import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from 'src/app/core';
import { fade } from '../../animations';

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
