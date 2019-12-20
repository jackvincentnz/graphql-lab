import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteActivityService {

  constructor() { }

  public deleteActivity(activityId: string) {
    console.log("delete: " + activityId);
    // TODO: add delete logic here.
  }
}
