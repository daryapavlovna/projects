import {Component, Input, OnInit} from '@angular/core';

import { HomeEvent } from '../../../shared/models/event.model';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'home-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[];
  @Input() events: HomeEvent[];
  isOpen = false;
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.events.forEach((e) => {
        e.catName = this.categories.find((c) => c.id === e.category).name;
      });
    }, 500);
  }

  getEventClass(e: HomeEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  open() {
    this.isOpen = !this.isOpen;
  }

  changeCriteria(field: string) {
    const nameMap = {
      amount: 'Сумма',
      date: 'Дата',
      type: 'Тип',
      category: 'Категория'
    };
    this.searchPlaceholder = nameMap[field];
    this.searchField = field;
  }

}
