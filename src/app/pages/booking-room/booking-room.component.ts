import { ActivatedRoute, Router } from '@angular/router';
import { MeetingRoomService } from './../../services/meeting-room.service';
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
  public approve_status: number = 0;
  public room_list: any[] = []
  public booking_id: any = null

  constructor(private bookingUservice: BookingService, private dialog: MatDialog, public meetingRoomService: MeetingRoomService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getRoomList();
    this.booking_id = this.activateRoute.snapshot.paramMap.get('booking_id');
    if (this.booking_id) {
      this.bookingUservice.checkBookingExist(this.booking_id).subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            this.onDetail(this.booking_id)
          } else if (res.status == 2) {
            this.router.navigate(['/admin/booking-room'])
          }
        }
      })
    }
  }

  getBookingList(){
    let room_selected = this.room_list.filter((room: any) => {
      return room.selected == true
    })
    let room:number[] = []
    room_selected.forEach((r: any) => {
      room.push(r.room_id)
    })
    this.bookingUservice.getBookingList(this.approve_status, room).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.booking_list = res.data
        }
      }
    })
  }

  onDetail(booking_id: number){
    let dialogRef =  this.dialog.open( BookingModalComponent, {
      width: '80%',
      minWidth: '400px',
      height: '85vh',
      data: {
        booking_id: booking_id
      }
    })

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.getBookingList();
      }
      if (this.booking_id) {
        this.booking_id = null
        this.router.navigate(['/admin/booking-room'])
      }
    })
  }

  onChangeStatusView(status: number){
    this.approve_status = status
    this.getBookingList();
  }

  getRoomList(){
    this.meetingRoomService.getRoomList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          if (res.data) {
            res.data.forEach((room: any) => {
              this.room_list.push({
                room_id: room.room_id,
                room_name: room.room_name,
                selected: true
              })
            })
            this.getBookingList();
          }
        }
      }
    })
  }

  onRoomClick(){
    this.getBookingList();
  }

}
