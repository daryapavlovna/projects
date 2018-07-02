import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'home-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill;
  @Input() currency;
  dollar: number;
  euro: number;
  uan: number;

  constructor() { }

  ngOnInit() {
    this.bill.forEach((b) => this.uan = b.value);
    this.dollar = this.currency.find((cur) => cur.cc === 'USD').rate * this.uan;
    this.euro = this.currency.find((cur) => cur.cc === 'EUR').rate * this.uan;
  }
}
