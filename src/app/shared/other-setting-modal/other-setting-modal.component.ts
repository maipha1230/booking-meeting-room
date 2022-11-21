import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-other-setting-modal',
  templateUrl: './other-setting-modal.component.html',
  styleUrls: ['./other-setting-modal.component.scss']
})
export class OtherSettingModalComponent implements OnInit {

  form: FormGroup;
  public title: string = ""
  public name_input: string = ""
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OtherSettingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createForm();
    if (this.data) {
      if (this.data.title_modal) {
        this.title = this.data.title_modal
      }
      if (this.data.name_input) {
        this.name_input = this.data.name_input
      }
    }
  }

  createForm(){
    this.form = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  onSave(){
    if (this.form.valid) {
      this.dialogRef.close({ data: this.form.controls['name'].value })
    }
  }

}
