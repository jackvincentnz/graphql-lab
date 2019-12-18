import { Injectable } from '@angular/core';

import {Apollo} from 'apollo-angular';

import { AddActivityGQL, ListedActivitiesQuery, ListedActivitiesDocument } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class AddActivityService {
  
  constructor(private apollo: Apollo, private addActivityMutation: AddActivityGQL) { }

  public addActivity(name: string) {
    this.addActivityMutation.mutate({ name: name }, {
      update: (store, { data: { addActivity } }) => {
        // TODO: type safety
        const data = store.readQuery<ListedActivitiesQuery>({ query: ListedActivitiesDocument });
        data.activities = [ ...data.activities, ...addActivity.activities ];
        store.writeQuery<ListedActivitiesQuery>({ query: ListedActivitiesDocument, data });
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
