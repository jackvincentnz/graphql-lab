import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';

import { ActivitiesComponent } from './activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    ActivitiesRoutingModule,
  ],
  declarations: [ActivitiesComponent, AddActivityComponent],
})
export class ActivitiesModule { }
