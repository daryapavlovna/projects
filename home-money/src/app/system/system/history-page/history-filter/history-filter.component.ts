import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'home-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
  @Output() onFilterClose =  new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', text: 'День'},
    {type: 'w', text: 'Неделя'},
    {type: 'M', text: 'Месяц'}
  ];
  types = [
    {type: 'income', label: 'доход'},
    {type: 'outcome', label: 'расход'}
  ];
  selectedPeriod = 'd';
  selectedCategories = [];
  selectedTypes = [];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterClose.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter((i) => i !== value);
    }
  }

  handleChangeType({checked, value}) {
   this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}
