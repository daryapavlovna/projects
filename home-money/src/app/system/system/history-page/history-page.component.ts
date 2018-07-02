import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../../shared/services/events.service';
import { HomeEvent } from '../../shared/models/event.model';

@Component({
  selector: 'home-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  categories = [];
  events = [];
  isLoaded = false;
  data = [];
  isFilterVisible = false;
  filteredEvents: HomeEvent[] = [];

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => this.categories = data);
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data;
      this.setOriginalEvents();
      this.calculateChartData();
    });
    this.isLoaded = true;
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData() {
    this.data = [];
    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.data.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisability(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisability(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisability(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.filteredEvents = this.filteredEvents.filter((e) => {
      return filterData.types.indexOf(e.type) !== -1;
    })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  onFilterClose() {
    this.toggleFilterVisability(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }
}
