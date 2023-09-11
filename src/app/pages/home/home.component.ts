import { Component, OnInit } from '@angular/core';
import { DataSenderService } from 'src/app/services/data-sender.service';

import { CardData } from './type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currencyRates: CardData[] = [];

  constructor(private dataService: DataSenderService<CardData[]>) {}

  ngOnInit(): void {
    this.dataService.getData.subscribe(data => {
      if (data) {
        this.currencyRates = data;
      }
    });
  }
}
