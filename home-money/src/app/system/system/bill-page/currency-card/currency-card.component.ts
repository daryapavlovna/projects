import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'home-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency;

  constructor() { }

  ngOnInit() {
  }

}
