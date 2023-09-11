import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
import * as Highcharts from 'highcharts';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  width: number = 100;
  height: number = 100;
  currencyValueChartOptions: any;
  Highcharts: typeof Highcharts = Highcharts;

  // monthlyValues: number[] = [
  //   130.6964568205, 131.0815562579, 132.2906769394, 123.4023576815,
  //   121.9652287546, 110.8630587121, 111.0014971018, 110.1396144989,
  //   110.4392919575, 107.6467911276, 107.4003197786, 107.2076966035,
  // ];
  monthlyValues: number[] = [];

  title?: string

  constructor(
    private route: ActivatedRoute,
    private converterService: ConverterService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const currencyFrom = data['from'];
      const currencyTo = data['to'];
      this.title = decodeURI(data['title']);
      if (currencyFrom && currencyTo) {
        this.converterService.getLastYearHistoricalData(currencyFrom, currencyTo)
          .subscribe((response) => {
            this.monthlyValues = [];
            response.forEach((element: any) => {
              this.monthlyValues.push(element.data[currencyTo].value);
            })
            this.setOptions();
          });
      }
    });
  }

  setOptions() {
    this.currencyValueChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: this.title,
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        title: {
          text: 'Value',
        },
      },
      series: [
        {
          name: 'Monthly Values',
          data: this.monthlyValues,
        },
      ],
    };
    
  }
}
