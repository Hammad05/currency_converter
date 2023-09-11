// Import statements
import { Component, Input } from '@angular/core';

// Component decorator
@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent {
  // Input properties
  @Input() name: string = '';
  @Input() code: string = '';
  @Input() perUnitValue: number = 0;
  @Input() value: string = '';

  // Constructor
  constructor() {}
}
