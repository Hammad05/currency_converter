// Import statements
import { Component } from '@angular/core';

import { DataSenderService } from './services/data-sender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Component properties
  hasError?: boolean = false;
  error?: string = '';

  constructor(
    private messageService: DataSenderService<{
      hasError?: boolean;
      error?: string;
    }>
  ) {
    // Subscribe to data service to handle error messages
    this.messageService.getData.subscribe((data) => {
      if (data) {
        this.error = data.error;
        this.hasError = data.hasError;

        // Hide error message after 5 seconds
        setTimeout(() => {
          this.hasError = false;
        }, 5000);
      }
    });
  }
}
