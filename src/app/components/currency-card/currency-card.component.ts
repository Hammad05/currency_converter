import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() name: string = "";
  @Input() code: string = "";
  @Input() perUnitValue: number = 0;
  @Input() value: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
