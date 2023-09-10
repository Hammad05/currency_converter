import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  width: number = 100
  height: number = 100;
  currencyValueChartOptions: any;
  Highcharts: typeof Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
    this.setOptions();
  }

  setOptions() {
    this.currencyValueChartOptions = {
      series: [
        {
          type: 'line',
          pointInterval: 24 * 3600 * 1000,
          data: [1, 2, 3, 4, 5],
        },
      ],
  }
  }
}

