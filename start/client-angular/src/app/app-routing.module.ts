import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityDetailsModule } from './activity-details/activity-details.module';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/activities',
    pathMatch: 'full'
  },
  // TODO: move to activity details routing module.
  { path: 'activity/:activityId', component: ActivityDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [PageNotFoundComponent,],
  imports: [
    RouterModule.forRoot(appRoutes),
    ActivityDetailsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
