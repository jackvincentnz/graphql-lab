import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable, } from 'rxjs';

import { ListedActivitiesGQL, ListedActivitiesQuery, ListedActivitiesQueryVariables, OnActivitiesUpdatedSubscriptionVariables, OnActivitiesUpdatedSubscription, OnActivitiesUpdatedDocument } from 'src/generated/graphql';
import { QueryRef } from 'apollo-angular';

export interface ListedActivity {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  public readonly activities$: Observable<ListedActivity[]>;

  private readonly activitiesQueryRef: QueryRef<ListedActivitiesQuery, ListedActivitiesQueryVariables>;

  constructor(
    private listedActivitiesQuery: ListedActivitiesGQL,
  ) {
    this.activitiesQueryRef = this.listedActivitiesQuery.watch();
    this.subscribeToActivityUpdates();

    this.activities$ = this.activitiesQueryRef.valueChanges.pipe(
      map(result => result.data && result.data.activities as ListedActivity[])
    );
  }

  private subscribeToActivityUpdates() {
    this.activitiesQueryRef.subscribeToMore<OnActivitiesUpdatedSubscription, OnActivitiesUpdatedSubscriptionVariables>({
      document: OnActivitiesUpdatedDocument,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return { ...prev, activities: subscriptionData.data.activitiesUpdated };
      }
    });
  }
}
