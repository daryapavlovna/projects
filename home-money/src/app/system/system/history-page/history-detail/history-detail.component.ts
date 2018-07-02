import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../../../../shared/services/events.service';
import { CategoriesService } from '../../../services/categories.service';
import { HomeEvent } from '../../../shared/models/event.model';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'home-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
  event: HomeEvent;
  category: Category;
  isLoaded = false;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
      this.eventsService.getEventById(params.id).subscribe((event) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category).subscribe((category) => {
          this.category = category;
        });
      });
    });
    this.isLoaded = true;
  }

}
