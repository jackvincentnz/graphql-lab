import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { ActivitiesService, ListedActivity } from './activities.service';
import { AddActivityService } from './add-activity.service';
import { DeleteActivityService } from './delete-activity.service';
import { ActivitySelectionService } from './activity-selection.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent {

  public readonly activities$: Observable<ListedActivity[]>

  constructor(
    private activityQueryService: ActivitiesService, 
    private addActivityService: AddActivityService,
    private deleteActivityService: DeleteActivityService,
    private activitySelectionService: ActivitySelectionService,
  ) {
    this.activities$ = this.activityQueryService.activities$;
  }

  public onAddActivity(name: string) {
    this.addActivityService.addActivity(name);
  }

  public onDelete(activityId: string) {
    this.deleteActivityService.deleteActivity(activityId);
  }

  public onRowClick(activityId: string) {
    this.activitySelectionService.selectActivity(activityId);
  }

}
