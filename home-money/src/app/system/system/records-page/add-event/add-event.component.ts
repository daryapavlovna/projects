import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import * as moment from 'moment';
import { mergeMap } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';

import { Category } from '../../../shared/models/category.model';
import { HomeEvent } from '../../../shared/models/event.model';
import { EventsService } from '../../../../shared/services/events.service';
import { BillService } from '../../../services/bill.service';
import { Message } from '../../../../shared/models/message.model';

@Component({
  selector: 'home-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  value = 0;
  message: Message;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(private eventsService: EventsService,
              private billService: BillService) { }

  ngOnInit() {
    this.message =  new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(form: NgForm) {
    const {amount, description, category, type} = form.value;
    const event = new HomeEvent(type, amount, +category, moment().format('DD.MM.YYYY HH-mm-ss'), description);
    this.billService.getBill().subscribe((bill) => {
      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(`На счету недостаточно средств.Вам не хватает ${amount - bill.value}`);
          return;
        } else {
          this.value = bill.value - amount;
        }
      } else {
        this.value = bill.value + amount;
      }
      const billValue = {
        value: this.value,
        currensy: bill.currensy
      };
      this.billService.updateBill(billValue)
        .pipe(mergeMap(() => this.eventsService.addEvent(event))).subscribe(() => {
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          });
      });
    });
    // this.eventsService.addEvent(event);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
