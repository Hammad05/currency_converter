import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Option } from './types';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options: Option[] = [];
  @Output() selected = new EventEmitter<Option>();

  selectedOption?: Option;
  isDropdownOpen = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  onSelected(option: Option) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.selected.emit(option);
  }
}
