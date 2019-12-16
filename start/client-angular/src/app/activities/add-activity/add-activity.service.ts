import { Injectable } from '@angular/core';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { ACTIVITIES_QUERY } from 'src/app/graphql/queries';

const ADD_ACTIVITY = gql`
  mutation addActivity($name: String!) {
    addActivity(name: $name) {
      activities {
        id
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AddActivityService {
  
  constructor(private apollo: Apollo) { }

  public addActivity(name: string) {
    // TODO: type safety
    this.apollo.mutate<any>({
      mutation: ADD_ACTIVITY,
      variables: { name: name },

      update: (store, { data: { addActivity } }) => {
        // TODO: type safety
        const data = store.readQuery<any>({ query: ACTIVITIES_QUERY });
        data.activities = [ ...data.activities, ...addActivity.activities ];
        store.writeQuery({ query: ACTIVITIES_QUERY, data });
      },
 
      optimisticResponse: {
        __typename: 'Mutation',
        addActivity: {
          activities: [{
            id: Date.now().toString(),
            name: name,
            __typename: "Activity"
          }],
          __typename: "ActivityUpdateResponse"
        },
      },
    }).subscribe(({ data }) => {
      console.log('mutation response', data);
    },(error) => {
      console.log('there was an error sending the mutation', error);
    });
  }
}
