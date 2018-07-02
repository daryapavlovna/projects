import { Component, OnInit } from '@angular/core';

import { BillService } from '../../services/bill.service';
import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../../shared/services/events.service';
import { Bill } from '../../shared/models/bill.model';
import { Category } from '../../shared/models/category.model';
import { HomeEvent } from '../../shared/models/event.model';

@Component({
  selector: 'home-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {
  isLoaded = false;
  bill: Bill[] = [];
  categories: Category[] = [];
  events: HomeEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) { }
  ngOnInit() {
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data;
    });
    this.billService.getBill().subscribe((data) => this.bill.push(data));
    this.categoriesService.getCategories().subscribe((data) => this.categories.push(data));
    this.isLoaded = true;
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCategoryCost(cat: Category) {
    const catEvents = this.events.filter((c) => c.category === cat.id && c.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

}
