import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
})
export class AddActivityComponent {

  @Output()
  public addActivity: EventEmitter<string>

  public addActivityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.addActivity = new EventEmitter<string>();
    this.addActivityForm = this.formBuilder.group({ name: '' });
  }

  public onSubmit(name: string) {    
    this.addActivity.emit(this.nameControl.value);
    this.addActivityForm.reset();
  }

  private get nameControl() {
    return this.addActivityForm.controls.name;
  }
}
