import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable, } from 'rxjs';

import { ListedActivitiesGQL } from 'src/generated/graphql';

export interface ListedActivity {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  public readonly activities$: Observable<ListedActivity[]>;

  constructor(
    private listedActivitiesQuery: ListedActivitiesGQL, 
  ) {
    const activitiesQueryRef = this.listedActivitiesQuery.watch();

    this.activities$ = activitiesQueryRef.valueChanges.pipe(
      map(result => result.data && result.data.activities as ListedActivity[])
    );
  }
}
