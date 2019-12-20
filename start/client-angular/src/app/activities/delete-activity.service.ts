import { Injectable } from '@angular/core';
import { DeleteActivityGQL, ListedActivitiesQuery, ListedActivitiesDocument } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class DeleteActivityService {

  constructor(private deleteActivityGQL: DeleteActivityGQL) { }

  public deleteActivity(activityId: string) {
    console.log("delete: " + activityId);
    // TODO: add delete logic here.
    this.deleteActivityGQL.mutate(
      { activityId: activityId }, 
      {
          update: (store, { data: { deleteActivity } }) => {
            const data = store.readQuery<ListedActivitiesQuery>({ query: ListedActivitiesDocument });
            data.activities = [ ...deleteActivity.activities ];
            store.writeQuery<ListedActivitiesQuery>({ query: ListedActivitiesDocument, data });
          },
      }
    ).subscribe();
  }
}
