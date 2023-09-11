import { Component, OnInit } from '@angular/core';
import { DataSenderService } from 'src/app/services/data-sender.service';
import { CardData } from './type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currencyRates: CardData[] = [
    {
      code: 'AUD',
      value: '0.85',
      perUnit: 0.4256394237,
      name: 'AUD - Australian Dollar',
    },
    {
      code: 'CAD',
      value: '0.74',
      perUnit: 0.3711168411,
      name: 'CAD - Canadian Dollar',
    },
    {
      code: 'CNY',
      value: '3.99',
      perUnit: 1.9937069042,
      name: 'CNY - Chinese Yuan',
    },
    {
      code: 'EUR',
      value: '0.51',
      perUnit: 0.2540574726,
      name: 'EUR - Euro',
    },
    {
      code: 'GBP',
      value: '0.44',
      perUnit: 0.2180494936,
      name: 'GBP - British Pound Sterling',
    },
    {
      code: 'HKD',
      value: '4.27',
      perUnit: 2.1346672495,
      name: 'HKD - Hong Kong Dollar',
    },
    {
      code: 'JPY',
      value: '80.12',
      perUnit: 40.0591934779,
      name: 'JPY - Japanese Yen',
    },
    {
      code: 'NZD',
      value: '0.92',
      perUnit: 0.4614949212,
      name: 'NZD - New Zealand Dollar',
    },
    {
      code: 'USD',
      value: '0.54',
      perUnit: 0.2723133274,
      name: 'USD - US Dollar',
    },
  ];

  constructor(private dataService: DataSenderService<CardData[]>) {}

  ngOnInit(): void {
    this.dataService.getData.subscribe((data) => {
      if (data) {
        this.currencyRates = data;
      }
    });
  }
}
