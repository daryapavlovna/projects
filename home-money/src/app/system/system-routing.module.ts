import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system/system.component';
import { BillPageComponent } from './system/bill-page/bill-page.component';
import { HistoryPageComponent } from './system/history-page/history-page.component';
import { PlanningPageComponent } from './system/planning-page/planning-page.component';
import { RecordsPageComponent } from './system/records-page/records-page.component';
import { HistoryDetailComponent } from './system/history-page/history-detail/history-detail.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  { path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      { path: 'bill', component: BillPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: 'planning', component: PlanningPageComponent },
      { path: 'records', component: RecordsPageComponent },
      { path: 'history/:id', component: HistoryDetailComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})

export class SystemRoutingModule {

}
