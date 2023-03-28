import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListedActivity } from '../activities.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent {

  @Input()
  public readonly activities: ListedActivity[];

  @Output()
  public readonly delete: EventEmitter<string>; 

  @Output()
  public readonly rowClick: EventEmitter<string>; 

  constructor() {
    this.delete = new EventEmitter<string>();
    this.rowClick = new EventEmitter<string>();
  }

  public onDeleteClick(activityId: string) {
    this.delete.emit(activityId);
  }

  public onRowClick(activityId: string) {
    this.rowClick.emit(activityId);
  }

}
