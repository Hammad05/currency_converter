import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutePath } from '../app-routing.module';
import { Option } from '../components/dropdown/types';
import { ConverterService } from '../services/converter.service';
import { DataSenderService } from '../services/data-sender.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  value?: number;
  currencyFrom?: Option;
  currencyTo?: Option;
  convertedValue?: string;
  perUnitValue?: number;
  options: Option[] = [];

  // Code to Currency Name Mapping
  codeToNameMap: Record<string, string> = {};

  // After converting currency
  convertedFromCurrency?: string = '';
  convertedToCurrency?: string = '';
  titleAsParams?: string = '';

  constructor(
    private converterService: ConverterService,
    private dataService: DataSenderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.converterService.getSupportedCurrencyOptions().subscribe((options) => {
      this.options = options;
      this.options.forEach((option) => {
        this.codeToNameMap[option.value] = option.label || 'Unavailable';
      });
    }, (error) => {
      this.dataService.setData({
        error: error?.error.message,
        hasError: true,
      })
    });
  }

  doConversion(amount?: number) {
    if (!this.currencyFrom || !this.currencyTo) return;
    if (amount) {
      this.converterService
        .getConversion(amount, this.currencyFrom?.value, this.currencyTo?.value)
        .subscribe((response) => {
          this.convertedValue = response.target.value.toFixed(2);
          this.perUnitValue = response.target.perUnit;
          this.convertedFromCurrency = this.currencyFrom?.value;
          this.convertedToCurrency = this.currencyTo?.value;
          this.titleAsParams =
            this.currencyFrom?.label + ' to ' + this.currencyTo?.label;
          const formatData = response.others.map((data) => {
            return {
              code: data.code,
              value: data.value.toFixed(2),
              perUnit: data.perUnit,
              name: this.codeToNameMap[data.code],
            };
          });
          this.dataService.setData(formatData);
        }, (error) => {
          this.dataService.setData({
            error: error.message,
            hasError: true,
          })
        });
    }
  }

  onCurrencyFrom(option: Option) {
    this.currencyFrom = option;
  }

  onCurrencyTo(option: Option) {
    this.currencyTo = option;
  }

  goToDetails() {
    if (!this.currencyFrom || !this.currencyTo) return;

    this.router.navigate([
      RoutePath.DetailsPage,
      {
        from: this.currencyFrom?.value,
        to: this.currencyTo?.value,
        title: this.titleAsParams,
      },
    ]);
  }
}
