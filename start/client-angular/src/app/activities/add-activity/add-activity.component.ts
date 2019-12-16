import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AddActivityService } from './add-activity.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
})
export class AddActivityComponent {

  public addActivityForm: FormGroup;

  constructor(
    private addActivityService: AddActivityService, 
    private formBuilder: FormBuilder,
  ) { 
    this.addActivityForm = this.formBuilder.group({ name: '' });
  }

  // TODO: move add activity form to child component with @Output and observe here.
  public onSubmit(name: string) {    
    this.addActivityService.addActivity(this.nameControl.value);
    this.addActivityForm.reset();
  }

  private get nameControl() {
    return this.addActivityForm.controls.name;
  }
}
