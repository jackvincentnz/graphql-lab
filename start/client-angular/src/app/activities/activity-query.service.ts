import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {Apollo, QueryRef} from 'apollo-angular';
import { ACTIVITY_QUERY, ACTIVITIES_QUERY } from '../graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class ActivityQueryService {
  public readonly activities$: Observable<any>;

  public readonly loading$: Observable<any>;

  public readonly errors$: Observable<any>;

  private activitiesQueryRef: QueryRef<any>; 

  constructor(private apollo: Apollo) {
    this.activitiesQueryRef = this.apollo.watchQuery<any>({ 
      query: ACTIVITIES_QUERY, 
      // TODO: figure out network change notification
      notifyOnNetworkStatusChange: true 
    });

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
    return this.apollo.watchQuery<any>({ 
      query: ACTIVITY_QUERY, 
      variables: { activityId: activityId },
      // TODO: figure out network change notification
      notifyOnNetworkStatusChange: true 
    }).valueChanges;
    
    // return this.apollo.query<any>({ 
    //   query: GET_ACTIVITY, 
    //   variables: { activityId: activityId },
    // });
  }
}
