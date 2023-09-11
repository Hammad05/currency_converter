// Import statements
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { Option } from './types';

// Component decorator
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  // Input properties
  @Input() options: Option[] = [];

  // Output event emitter
  @Output() selected = new EventEmitter<Option>();

  // Component properties
  selectedOption?: Option;
  isDropdownOpen = false;

  // Constructor with dependency injection
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  // Method to toggle the dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Host listener to handle clicks outside the dropdown
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  // Method to handle option selection
  onSelected(option: Option) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    
    // Emit the selected event
    this.selected.emit(option);
  }
}
