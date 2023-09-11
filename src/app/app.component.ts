import { Component } from '@angular/core';

import { DataSenderService } from './services/data-sender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hasError?: boolean = false;
  error?: string = '';

  constructor(
    private messageService: DataSenderService<{
      hasError?: boolean;
      error?: string;
    }>
  ) {
    this.messageService.getData.subscribe(data => {
      if (data) {
        this.error = data.error;
        this.hasError = data.hasError;
        setTimeout(() => {
          this.hasError = false;
        }, 5000);
      }
    });
  }
}
