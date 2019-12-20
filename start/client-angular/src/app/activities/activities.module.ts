import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivitiesRoutingModule } from './activities-routing.module';

import { ActivitiesComponent } from './activities.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AddActivityComponent } from './add-activity/add-activity.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    ActivitiesRoutingModule,
  ],
  declarations: [ActivitiesComponent, AddActivityComponent, ActivityListComponent],
})
export class ActivitiesModule { }
