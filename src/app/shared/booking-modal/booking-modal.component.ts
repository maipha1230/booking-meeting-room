import { EditBookingModalComponent } from './../edit-booking-modal/edit-booking-modal.component';
import { BookingService } from './../../services/booking.service';
import { AlertService } from './../../services/alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {

  public booking: any = {}
  public room: any = {}
  public user: any = {}

  constructor(
    private dialogRef: MatDialogRef<BookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private bookingService: BookingService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.data) {
      if (this.data.booking_id) {
        this.getBookingById(this.data.booking_id)
      }

    }
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

  onPermitClick(permit: number){
    if (permit == 1) {
      this.alertService.ensureAlert("อนุญาตใช่หรือไม่?").subscribe((confirm: any) => {
        if (confirm) {
          this.bookingService.bookingPermission(this.booking.booking_id, permit).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg)
                this.dialogRef.close(true)
              }
            }
          })
        }
      })
    } else if (permit == 2) {
      this.alertService.ensureAlert("ปฏิเสธใช่หรือไม่?").subscribe((confirm: any) => {
        if (confirm) {
          this.bookingService.bookingPermission(this.booking.booking_id, permit).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg)
                this.dialogRef.close(true)
              }
            }
          })
        }
      })
    }

  }

  onEditBooking(){
    this.alertService.ensureEditBooking("คุณต้องการแก้ไขคำร้องนี้ใช่หรือไม่?").subscribe((confirm: any) => {
      if (confirm) {
        let dialogRef = this.dialog.open(EditBookingModalComponent, {
          width: '80%',
          minWidth: '400px',
          height: '100%',
          data: {
            booking_id: this.booking.booking_id
          }
        })

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            this.getBookingById(this.booking.booking_id)
          }
        })
      }
    })
  }

  onClose(){
    this.dialogRef.close()
  }

}
