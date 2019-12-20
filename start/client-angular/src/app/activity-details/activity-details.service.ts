import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivityMetaDataGQL } from 'src/generated/graphql';
import { Observable, of, EMPTY } from 'rxjs';

export interface ActivityDetailsQuery {
  id: string,
  name: string,
  loading: boolean,
};

@Injectable({
  providedIn: 'root'
})
export class ActivityDetailsService {

  constructor(private activityMetaDataQuery: ActivityMetaDataGQL) { }

  public activityById$(activityId: string): Observable<ActivityDetailsQuery> {
    return this.activityMetaDataQuery.watch({ activityId: activityId }).valueChanges.pipe(
      map(query => ({ ...query.data.activity, loading: query.loading } as ActivityDetailsQuery))
    )
  }
}
