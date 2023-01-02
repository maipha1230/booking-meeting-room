import { BookingService } from './../../services/booking.service';
import { AlertService } from './../../services/alert.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-booking-detail-modal',
  templateUrl: './booking-detail-modal.component.html',
  styleUrls: ['./booking-detail-modal.component.scss']
})
export class BookingDetailModalComponent implements OnInit {

  public booking: any = {}
  public room: any = {}
  public user: any = {}

  constructor(
    private dialogRef: MatDialogRef<BookingDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private bookingService: BookingService,
    private dialog: MatDialog
  ) {
    if (this.data) {
      if (this.data.booking_id) {
        this.getBookingById(this.data.booking_id)
      }

    }
   }

  ngOnInit(): void {

  }

  getBookingById(booking_id: number){
    this.bookingService.getBookingById(booking_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          if (res.data) {
            if (res.data.booking) {
              this.booking = res.data.booking
            }
            if (res.data.room) {
              this.room = res.data.room
            }
            if (res.data.user) {
              this.user = res.data.user
            }
          }
        }
      }
    })
  }

  onClose(){
    this.dialogRef.close()
  }
}
