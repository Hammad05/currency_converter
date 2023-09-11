import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() color: string | 'primary' | 'secondary' = '';
  @Output() btnClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    switch (this.color) {
      case 'primary':
        this.color = 'var(--color-primary)';
        break;
      case 'secondary':
        this.color = 'var(--color-secondary)';
    }
  }

  onClick() {
    this.btnClick.emit();
  }
}
