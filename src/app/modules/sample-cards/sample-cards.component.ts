import { Component, OnInit } from '@angular/core';
import { flat, colorful, rainbow } from './../graphs/colorScheme';
import { countryData, saleData } from './../graphs/graphData';

@Component({
  selector: 'app-sample-cards',
  templateUrl: './sample-cards.component.html',
  styleUrls: ['./sample-cards.component.css']
})
export class SampleCardsComponent implements OnInit {
  //Options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  //Colors
  colorSchemeA = flat.domain[0];
  colorSchemeB = colorful.domain[0];
  colorSchemeC = rainbow.domain[0];

  //Data
  saleData = saleData;
  countryData = countryData;

  constructor() { }

  ngOnInit(): void {
  }

}
