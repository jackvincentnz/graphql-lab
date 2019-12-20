import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { ActivityDetailsService, ActivityDetailsQuery } from './activity-details.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
})
export class ActivityDetailsComponent implements OnInit {

  public readonly activity$: Observable<ActivityDetailsQuery>;

  public readonly loading$: Observable<boolean>

  private readonly activityId$subject: Subject<string>;

  private readonly destroy$: Subject<void>;

  constructor(
    private activityDetailsService: ActivityDetailsService, 
    private route: ActivatedRoute
  ) { 
    this.activityId$subject = new Subject<string>();
    this.activity$ = this.activityDetailsService.activityById$("1");

    this.loading$ = this.activity$.pipe(
      map(result => result.loading),
      startWith(true)
    );
  }

  public ngOnInit() {
    // TODO: use route to load activity by id.
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const activityId = params.get('activityId');
      this.activityId$subject.next(activityId);
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

}
