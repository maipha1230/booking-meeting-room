import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-date-event',
  templateUrl: './date-event.component.html',
  styleUrls: ['./date-event.component.scss']
})
export class DateEventComponent implements OnInit {

  public booking_list:any[] = []
  constructor( private dialogRef: MatDialogRef<DateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      if (this.data) {
        if (this.data.booking) {
          this.booking_list = this.data.booking
        }
      }
    }

  ngOnInit(): void {
  }

}
