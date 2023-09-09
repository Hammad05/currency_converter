import { Component, OnInit } from '@angular/core';
import { Option } from '../components/dropdown/types';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  amount?: number;
  currencyFrom: string = "";
  currencyTo: string = "";

  options: Option[] = [{
    label: 'EUR',
    value: 'EUR'
  },
  {
    label: 'USD',
    value: 'USD'
  }];

  constructor() { }

  ngOnInit(): void {
  }

  doConversion(amount?: number) {
    console.log("amount", amount);
  }

  onCurrencyFrom(option: Option) {
    console.log("from", option);
  }

  onCurrencyTo(option: Option) {
    console.log("to", option);
  }

}
