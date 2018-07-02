import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Bill } from '../shared/models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBill(): Observable<any> {
    return this.http.get('http://localhost:3000/bill');
  }

  updateBill(bill: Bill): Observable<any> {
    return this.http.put('http://localhost:3000/bill', bill);
  }

  getCurrency(base: string = 'USD'): Observable<any> {
    return this.http.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&cc=${base}`);
  }
}
