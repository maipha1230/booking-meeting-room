import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  booking_list: any[] = []
  constructor(private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.getBookingList();
  }

  getBookingList(){
    this.userService.userBookingList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.booking_list = res.data
        }
      }
    })
  }

  onEditBooking(booking_id: number) {
    this.alertService.ensureEditBooking("คุณต้องการแกไข้ฟอร์มการจองใช่หรือไม่?").subscribe((confirm: any) => {
      if (confirm) {
        this.router.navigate(['/booking-meeting-room', booking_id ])
      }
    })
  }

  onRemoveBooking(booking_id: number) {
    this.alertService.ensureDeleteAlert("คุณต้องการยกเลิกการจองใช่หรือไม่").subscribe((confirm: any) => {
      if (confirm) {
        this.userService.userRemoveBooking(booking_id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getBookingList();
            }
          }
        })
      }
    })
  }

}
