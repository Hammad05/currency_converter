// Import statements
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
  // Component properties
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

  // Angular lifecycle hook - ngOnInit
  ngOnInit(): void {
    // Fetch supported currency options and populate codeToNameMap
    this.converterService.getSupportedCurrencyOptions().subscribe(
      (options) => {
        this.options = options;
        this.options.forEach((option) => {
          this.codeToNameMap[option.value] = option.label || 'Unavailable';
        });
      },
      (error) => {
        this.dataService.setData({
          error: error?.error.message,
          hasError: true,
        });
      }
    );
  }

  // Perform currency conversion
  doConversion(amount?: number) {
    if (!this.currencyFrom || !this.currencyTo) return;
    if (amount) {
      this.converterService
        .getConversion(amount, this.currencyFrom?.value, this.currencyTo?.value)
        .subscribe(
          (response) => {
            // Handle successful conversion response
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
          },
          (error) => {
            // Handle conversion error
            this.dataService.setData({
              error: error.message,
              hasError: true,
            });
          }
        );
    }
  }

  // Handle currency selection for 'From' dropdown
  onCurrencyFrom(option: Option) {
    this.currencyFrom = option;
  }

  // Handle currency selection for 'To' dropdown
  onCurrencyTo(option: Option) {
    this.currencyTo = option;
  }

  // Navigate to details page with selected currencies
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
