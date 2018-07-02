import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'home-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {
  @Input() data;
  view: any[] = [700, 400];

  constructor() {}

  ngOnInit() {
  }

}
