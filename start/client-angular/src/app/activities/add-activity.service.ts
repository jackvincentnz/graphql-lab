import { Injectable } from '@angular/core';

import { AddActivityGQL, ListedActivitiesQuery, ListedActivitiesDocument, AddActivityMutation } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class AddActivityService {
  
  constructor(private addActivityMutation: AddActivityGQL) { }

  public addActivity(name: string) {
    const optimisticResponse: AddActivityMutation = {
      __typename: 'Mutation',
      addActivity: {
        activities: [{
          id: Date.now().toString(),
          name: name,
          __typename: "Activity"
        }],
        __typename: "ActivityUpdateResponse"
      },
    };

    this.addActivityMutation.mutate({ name: name }, {
      update: (store, { data: { addActivity } }) => {
        const data = store.readQuery<ListedActivitiesQuery>({ query: ListedActivitiesDocument });
        data.activities = [ ...data.activities, ...addActivity.activities ];
        store.writeQuery<ListedActivitiesQuery>({ query: ListedActivitiesDocument, data });
      },

      optimisticResponse,
  }).subscribe(({ data }) => {
      console.log('mutation response', data);
    },(error) => {
      console.log('there was an error sending the mutation', error);
    });
  }
}
