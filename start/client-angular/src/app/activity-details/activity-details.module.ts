import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailsComponent } from './activity-details.component';

@NgModule({
  declarations: [ActivityDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [ActivityDetailsComponent],
})
export class ActivityDetailsModule { }
