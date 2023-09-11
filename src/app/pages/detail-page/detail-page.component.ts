// Import statements
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getYear } from 'date-fns';
// @ts-ignore
import * as Highcharts from 'highcharts';
import { ConverterService } from 'src/app/services/converter.service';
import { DataSenderService } from 'src/app/services/data-sender.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  // Component properties
  width: number = 100;
  height: number = 100;
  currencyValueChartOptions: any;
  Highcharts: typeof Highcharts = Highcharts;

  monthlyValues: number[] = [];

  title?: string;
  currencyTo?: string;
  currencyFrom?: string;
  hasError: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private converterService: ConverterService,
    private dataService: DataSenderService,
  ) {}

  // Angular lifecycle hook - ngOnInit
  ngOnInit(): void {
    this.fetchData();
  }

  // Fetch data based on route parameters
  fetchData() {
    this.hasError = false;
    this.route.params.subscribe((data) => {
      this.currencyFrom = data['from'];
      this.currencyTo = data['to'];
      this.title = decodeURI(data['title']);
      if (this.currencyFrom && this.currencyTo) {
        this.converterService
          .getLastYearHistoricalData(this.currencyFrom, this.currencyTo)
          .subscribe(
            (response) => {
              if (this.currencyTo) {
                this.monthlyValues = [];
                response.forEach((element: any) => {
                  this.monthlyValues.push(element.data[this.currencyTo!!].value);
                });
                this.setOptions();
              }
            },
            (error) => {
              this.hasError = true;
              this.dataService.setData({
                error: error?.error.message,
                hasError: true,
              });
            }
          );
      }
    });
  }

  // Configure Highcharts options
  setOptions() {
    this.currencyValueChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: this.title,
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yAxis: {
        title: {
          text: this.currencyTo,
        },
      },
      series: [
        {
          name: `Monthly values for year ${getYear(Date.now()) - 1}`,
          data: this.monthlyValues,
        },
      ],
    };
  }

  // Reload data
  reload() {
    this.fetchData();
  }
}
