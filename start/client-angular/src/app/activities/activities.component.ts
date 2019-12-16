import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ActivityQueryService } from './activity-query.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent {

  public readonly activities$: Observable<any> = this.activityQueryService.activities$;

  public readonly loading$: Observable<any> = this.activityQueryService.loading$;

  public readonly errors$: Observable<any> = this.activityQueryService.errors$;

  public readonly activityLoading$: Observable<any>;

  public readonly activity$: Observable<any>;

  constructor(private activityQueryService: ActivityQueryService) {
    // TODO: move to activity details.
    const activitySource$ = this.activityQueryService.activityById$("1");
    this.activityLoading$ = activitySource$.pipe(
      map(result => result.loading),
      // TODO: this shouldn't be necessary?
      startWith(true)
    );
    this.activity$ = activitySource$.pipe(map(result => result.data.activity));
  }

}
