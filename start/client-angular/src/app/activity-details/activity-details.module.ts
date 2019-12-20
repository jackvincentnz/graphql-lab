import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailsComponent } from './activity-details.component';
import { ActivitySummaryComponent } from './activity-summary/activity-summary.component';

@NgModule({
  declarations: [ActivityDetailsComponent, ActivitySummaryComponent],
  imports: [
    CommonModule
  ],
  exports: [ActivityDetailsComponent],
})
export class ActivityDetailsModule { }
