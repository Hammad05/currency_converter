import { Component, OnInit } from '@angular/core';
import { Option } from '../components/dropdown/types';
import { ConverterService } from '../services/converter.service';
import { ConvertResponse } from '../services/types';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  value?: number;
  currencyFrom: string = '';
  currencyTo: string = '';
  convertedValue?: string;
  perUnitValue?: number;
  options: Option[] = [];

  // After converting currency
  convertedFromCurrency?: string = '';
  convertedToCurrency?: string = '';

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    this.converterService.getSupportedCurrencyOptions().subscribe((options) => {
      this.options = options;
    })
  }

  doConversion(amount?: number) {
    if (amount) {
      this.converterService
        .getConversion(amount, this.currencyFrom, this.currencyTo)
        .subscribe((response) => {
          this.convertedValue = response.value.toFixed(2);
          this.perUnitValue = response.perUnit;
          this.convertedFromCurrency = this.currencyFrom;
          this.convertedToCurrency = this.currencyTo;
        });
    }
  }

  onCurrencyFrom(option: Option) {
    this.currencyFrom = option.value;

  }

  onCurrencyTo(option: Option) {
    this.currencyTo = option.value;
  }
}
