import { Component, Input } from '@angular/core';

import { ActivityDetailsQuery } from '../activity-details.service';

@Component({
  selector: 'app-activity-summary',
  templateUrl: './activity-summary.component.html',
})
export class ActivitySummaryComponent {

  @Input()
  public activity: ActivityDetailsQuery

  @Input()
  public loading: Boolean;
}
