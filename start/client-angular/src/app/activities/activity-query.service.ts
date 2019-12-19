import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { QueryRef, Apollo} from 'apollo-angular';

import { ActivityMetaDataGQL, ListedActivitiesGQL } from '../../generated/graphql';
import gql from 'graphql-tag';
import { GET_SELECTION } from '../graphql/resolvers';

const GET_SELECTED_ACTIVITY = gql`
  query SelectedActivity {
    selectedActivity @client
  }
`;

const SELECT_ACTIVITY = gql`
  mutation selectActivity($id: ID!) {
    selectActivity(id: $id) @client {
     id 
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ActivityQueryService {
  public readonly activities$: Observable<any>;

  public readonly loading$: Observable<any>;

  public readonly errors$: Observable<any>;

  public readonly selectedActivity$: Observable<string>;

  private activitiesQueryRef: QueryRef<any>; 

  constructor(
    private listedActivitiesQuery: ListedActivitiesGQL, 
    private activityMetaDataQuery: ActivityMetaDataGQL,
    private apollo: Apollo,
  ) {
    this.activitiesQueryRef = this.listedActivitiesQuery.watch();

    //const source$ = this.apollo.query<any>({ query: ACTIVITIES_QUERY });
    const source$ = this.activitiesQueryRef.valueChanges;

    this.activities$ = source$.pipe(
      map(result => result.data && result.data.activities)
    );
    this.loading$ = source$.pipe(map(result => result.loading));
    this.errors$ = source$.pipe(map(result => result.errors));

    this.selectedActivity$ = this.apollo
      .watchQuery<{selectedActivity: string}>({
        query: GET_SELECTED_ACTIVITY})
      .valueChanges.pipe(
        map(result => result.data && result.data.selectedActivity),
      );
  }

  // TODO: move to activity details
  public activityById$(activityId: string) {
    return this.activityMetaDataQuery.watch({ activityId: activityId }).valueChanges;
  }

  public selectActivityById(id: string) {
    this.apollo.mutate<any>({
      mutation: SELECT_ACTIVITY,
      variables: { id: id },
      refetchQueries: [
        {
          query: GET_SELECTION,
        },
      ]
    }).subscribe(({ data }) => {
      console.log('mutation response', data);
    },(error) => {
      console.log('there was an error sending the mutation', error);
    });
  }
}
