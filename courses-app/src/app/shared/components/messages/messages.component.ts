import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessagesService } from '@app/core';
import { fade } from '@app/shared/animations';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade],
})
export class MessagesComponent implements OnInit {
  errors$: Observable<string[]>;
  shown = false;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => this.shown = true),
    );
  }

  onClose(): void {
    this.shown = false;
  }
}
