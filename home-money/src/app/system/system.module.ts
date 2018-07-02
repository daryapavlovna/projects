import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system/system.component';
import { BillPageComponent } from './system/bill-page/bill-page.component';
import { HistoryPageComponent } from './system/history-page/history-page.component';
import { PlanningPageComponent } from './system/planning-page/planning-page.component';
import { RecordsPageComponent } from './system/records-page/records-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BillCardComponent } from './system/bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './system/bill-page/currency-card/currency-card.component';
import { BillService } from './services/bill.service';
import { AddEventComponent } from './system/records-page/add-event/add-event.component';
import { AddCategoryComponent } from './system/records-page/add-category/add-category.component';
import { EditCategoryComponent } from './system/records-page/edit-category/edit-category.component';
import { CategoriesService } from './services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { HistoryChartComponent } from './system/history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './system/history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './system/history-page/history-detail/history-detail.component';
import { HistoryFilterComponent } from './system/history-page/history-filter/history-filter.component';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    BillCardComponent,
    CurrencyCardComponent,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryDetailComponent,
    HistoryFilterComponent,
    FilterPipe
  ],
  providers: [
    BillService,
    CategoriesService,
    EventsService
  ]
})
export class SystemModule {

}
