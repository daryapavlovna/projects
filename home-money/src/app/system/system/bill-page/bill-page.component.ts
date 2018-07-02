import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { BillService } from '../../services/bill.service';

@Component({
  selector: 'home-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();
  currency = [];
  bill = [];
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.billService.getBill().subscribe((bill) => {
      this.bill.push(bill);
    });
    this.billService.getCurrency().subscribe((currency) => currency.forEach((cur) => {
      if (cur.cc === 'USD') {
        this.currency.push(cur);
      } if ( cur.cc === 'EUR') {
        this.currency.push(cur);
      }if (cur.cc === 'RUB') {
        this.currency.push(cur);
      }
      this.isLoaded = true;
    }));
  }

  onRefresh() {
    this.isLoaded = false;
    const neutralCurrency = [];
    this.billService.getCurrency().subscribe((currency) => currency.forEach((cur) => {
      if (cur.cc === 'USD') {
        neutralCurrency .push(cur);
      }
      if (cur.cc === 'EUR') {
        neutralCurrency .push(cur);
      }
      if (cur.cc === 'RUB') {
        neutralCurrency .push(cur);
      }
      this.currency = neutralCurrency;
      this.isLoaded = true;
    }));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
