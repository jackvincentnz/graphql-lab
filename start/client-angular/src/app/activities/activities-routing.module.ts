import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivitiesComponent } from './activities.component';

const activitiesRoutes: Routes = [
  { 
    path: 'activities', 
    component: ActivitiesComponent,  
    // TODO: https://angular.io/guide/router#resolve-guard
    data: { title: 'Activities List' } 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(activitiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivitiesRoutingModule { }
