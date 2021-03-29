import { Component, OnInit } from '@angular/core';
import { flat, colorful, rainbow } from './../graphs/colorScheme';
import { countryData, saleData } from './../graphs/graphData';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
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
  colorSchemeA = flat;
  colorSchemeB = colorful;
  colorSchemeC = rainbow;

  //Data
  saleData = saleData;
  countryData = countryData;

  constructor() { }

  ngOnInit(): void {
  }

}
