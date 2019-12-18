import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {Apollo, QueryRef} from 'apollo-angular';

import { ListedActivitiesGQL, ActivityMetaDataGQL } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class ActivityQueryService {
  public readonly activities$: Observable<any>;

  public readonly loading$: Observable<any>;

  public readonly errors$: Observable<any>;

  private activitiesQueryRef: QueryRef<any>; 

  constructor(
    private listedActivitiesService: ListedActivitiesGQL, 
    private activityMetaDataService: ActivityMetaDataGQL 
  ) {
    this.activitiesQueryRef = this.listedActivitiesService.watch();

    //const source$ = this.apollo.query<any>({ query: ACTIVITIES_QUERY });
    const source$ = this.activitiesQueryRef.valueChanges;

    this.activities$ = source$.pipe(
      map(result => result.data && result.data.activities)
    );
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));
  }

  // TODO: move to activity details
  public activityById$(activityId: string) {
    return this.activityMetaDataService.watch({ activityId: activityId }).valueChanges;
  }
}
