import { BookingFormModel } from './../../model/bookingForm.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { UserService } from './../../services/user.service';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public room_list: any = [];
  public purpose_list: any = [];
  public device_list: any = [];

  public booking_id: any = null;

  public formBooking: FormGroup;

  constructor(
    private meetingRoomService: MeetingRoomService,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRoomList();
    this.getBookingPurposeList();
    this.getRoomDeviceList();
    this.createFormBooking();
    this.booking_id = this.activateRoute.snapshot.paramMap.get('booking_id');
    if (this.booking_id) {
      this.checkUserOwnBooking(Number(this.booking_id))
    }
  }

  checkUserOwnBooking(booking_id: number) {
    this.userService.checkUserOwnBooking(booking_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.getUserBookingById(booking_id);
        } else if (res.status == 2) {
          this.router.navigate(['/'])
        }
      }
    })
  }

  createFormBooking() {
    this.formBooking = this.formBuilder.group({
      room: [null, Validators.required],
      title: ['', Validators.required],
      purpose: [1, Validators.required],
      quantity: ['', Validators.required],
      device: [[]],
      date: [null, Validators.required],
      time_start: [null, Validators.required],
      time_end: [null, Validators.required],
    });
  }

  pathFormBooking(data: BookingFormModel) {
    this.formBooking.patchValue({
      room: data.room,
      title: data.title,
      purpose: data.purpose,
      quantity: data.quantity,
      date: data.date,
      time_start: data.time_start,
      time_end: data.time_end,
    });

    this.device_list.forEach((device: any) => {
      data.device.forEach((item: any) => {
        if (device.room_device_id == item.room_device_id) {
          device.selected = true;
        }
      });
    });
  }

  getRoomList() {
    this.meetingRoomService.getRoomList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.room_list = res.data;
        }
      }
    });
  }

  getUserBookingById(booking_id: number) {
    this.userService.getUserBookingById(booking_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.pathFormBooking(res.data);
        }
      }
    });
  }

  getBookingPurposeList() {
    this.meetingRoomService.getBookingPurposeList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.purpose_list = res.data;
        }
      }
    });
  }

  getRoomDeviceList() {
    this.meetingRoomService.getRoomDeviceList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.device_list = res.data;
        }
      }
    });
  }

  prepareForm(): BookingFormModel {
    let form = new BookingFormModel();

    form.room = this.formBooking.controls['room'].value;
    form.title = this.formBooking.controls['title'].value;
    form.purpose = this.formBooking.controls['purpose'].value;
    form.quantity = this.formBooking.controls['quantity'].value;
    form.device = this.device_list;
    form.date = this.formBooking.controls['date'].value;
    form.time_start = this.formBooking.controls['time_start'].value;
    form.time_end = this.formBooking.controls['time_end'].value;

    form.device = form.device.filter((device: any) => {
      return device.selected == true;
    });

    return form;
  }

  onSubmitBookingForm() {
    if (this.formBooking.valid) {
      if (!this.timeCheck() || !this.dateCheck()) {
        this.alertService.warningAlert('กรุณาเลือกเวลาจากน้อยไปหามาก');
      } else {
        const form = this.prepareForm();
        if (this.booking_id) {
          this.alertService.submitAlert("คุณต้องการแก้ไขการจองห้องประชุมใช่หรือไม่?").subscribe((result: any) => {
            if (result) {
              this.userService.userEditBooking(this.booking_id, form).subscribe((res: any) => {
                if (res) {
                  if (res.status == 1) {
                    this.alertService.successAlert(res.msg)
                    this.router.navigate(['/booking-list'])
                  } else if (res.status == 2) {
                    if (res.booked) {
                      let msg = '';
                      for (let i = 0; i < res.booked.length; i++) {
                        if (
                          i == res.booked.length - 1 &&
                          res.booked.length == 1
                        ) {
                          msg += `${res.booked[i].time_start} - ${res.booked[i].time_end}`;
                        } else {
                          msg += `${res.booked[i].time_start} - ${res.booked[i].time_end}, `;
                        }
                      }
                      this.alertService
                        .timeBookingOverlapAlert(res.msg, msg)
                        .subscribe((check: any) => {
                          if (check) {
                            this.router.navigate(['/home']);
                          }
                        });
                    }
                  }
                }
              })
            }
          })
        } else {
          this.alertService
          .submitAlert('คุณต้องการจองห้องประชุมใช่หรือไม่?')
          .subscribe((result: any) => {
            if (result) {
              this.userService.userSubmitBooking(form).subscribe((res: any) => {
                if (res) {
                  if (res.status == 1) {
                    this.alertService
                      .bookingSuccessAlert(res.msg)
                      .subscribe((confirm: any) => {
                        if (confirm) {
                          this.router.navigate(['/booking-list']);
                        }
                      });
                    this.createFormBooking();
                  } else if (res.status == 2) {
                    if (res.booked) {
                      let msg = '';
                      for (let i = 0; i < res.booked.length; i++) {
                        if (
                          i == res.booked.length - 1 &&
                          res.booked.length == 1
                        ) {
                          msg += `${res.booked[i].time_start} - ${res.booked[i].time_end}`;
                        } else {
                          msg += `${res.booked[i].time_start} - ${res.booked[i].time_end}, `;
                        }
                      }
                      this.alertService
                        .timeBookingOverlapAlert(res.msg, msg)
                        .subscribe((check: any) => {
                          if (check) {
                            this.router.navigate(['/home']);
                          }
                        });
                    }
                  }
                }
              });
            }
          });
        }
      }
    }
  }

  timeCheck() {

    let time_start = this.formBooking.controls['time_start'].value;
    let time_end = this.formBooking.controls['time_end'].value;

    const getMinutes = (s: string) => {
      const p = s.split(':').map(Number);
      return p[0] * 60 + p[1];
    };

    return getMinutes(time_start)  <= getMinutes(time_end) ;
  }

  dateCheck(){
    let dateNow = new Date();
    let datePicked = new Date(this.formBooking.controls['date'].value);
    datePicked.getFullYear()
    console.log(datePicked.getFullYear());

    if (datePicked.getFullYear() >= dateNow.getFullYear()) {
      if (datePicked.getMonth() >= dateNow.getMonth()) {
        if (datePicked.getDate() >= dateNow.getDate()) {
          return true;
        }
      }
    }
    return false;
  }

  onClearBookingForm() {
    this.alertService
      .ensureDeleteAlert('ต้องการล้างทั้งหมดใช่หรือไม่?')
      .subscribe((result: any) => {
        if (result) {
          this.createFormBooking();
        }
      });
  }
}
