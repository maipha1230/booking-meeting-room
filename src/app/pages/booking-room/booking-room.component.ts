import { BookingModalComponent } from './../../shared/booking-modal/booking-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.scss']
})
export class BookingRoomComponent implements OnInit {

  public booking_list: any[] = []

  constructor(private bookingUservice: BookingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBookingList();
  }

  getBookingList(){
    this.bookingUservice.getBookingList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.data);

          this.booking_list = res.data
        }
      }
    })
  }

  onDetail(booking_id: number){
    let dialogRef =  this.dialog.open( BookingModalComponent, {
      width: '80%',
      minWidth: '400px',
      height: 'auto',
      minHeight: '90%',
      data: {
        booking_id: booking_id
      }
    })

    dialogRef.afterClosed().subscribe((response: any) => {

    })

  }

}
