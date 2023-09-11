// Import statements
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Component decorator
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  // Input properties
  @Input() text: string = '';
  @Input() color: string | 'primary' | 'secondary' = '';
  @Input() disabled: boolean = false;

  // Output event emitter
  @Output() btnClick = new EventEmitter<void>();

  // Constructor
  constructor() {}

  // Angular lifecycle hook - ngOnInit
  ngOnInit(): void {
    // Map color property to CSS variables
    this.mapColorToCssVariable();
  }

  // Method to handle button click
  onClick() {
    // Emit the btnClick event
    this.btnClick.emit();
  }

  // Private method to map color property to CSS variable
  private mapColorToCssVariable() {
    switch (this.color) {
      case 'primary':
        this.color = 'var(--color-primary)';
        break;
      case 'secondary':
        this.color = 'var(--color-secondary)';
        break;
      default:
        // If color is not 'primary' or 'secondary', leave it as is
        break;
    }
  }
}
