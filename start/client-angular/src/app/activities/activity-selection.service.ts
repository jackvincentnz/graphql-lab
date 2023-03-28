import { Injectable } from '@angular/core';
import { SelectActivityGQL, ListedActivitiesDocument } from 'src/generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class ActivitySelectionService {

  constructor(private selectActivityGQL: SelectActivityGQL) { }

  public selectActivity(activityId: string) {
    console.log("selected: " + activityId);
    this.selectActivityGQL.mutate({ activityId: activityId }, { refetchQueries: [{ query: ListedActivitiesDocument, }]} ).subscribe();
  }
}
