import { BookingService } from './../../services/booking.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingFormModel } from './../../model/bookingForm.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-booking-modal',
  templateUrl: './edit-booking-modal.component.html',
  styleUrls: ['./edit-booking-modal.component.scss']
})
export class EditBookingModalComponent implements OnInit {

  public room_list: any = [];
  public purpose_list: any = [];
  public device_list: any = [];

  public formBooking: FormGroup;

  constructor(
    private meetingRoomService: MeetingRoomService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<EditBookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private bookingService: BookingService,
  ) {}

  ngOnInit(): void {
    this.getRoomList();
    this.getBookingPurposeList();
    this.getRoomDeviceList();
    this.createFormBooking();
    if (this.data) {
      if (this.data.booking_id) {
        this.getUserBookingById(this.data.booking_id)
      }
    }
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
      link: [""]
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
      link: data.link
    });

    this.device_list.forEach((device: any) => {
      data.device.forEach((item: any) => {
        if (device.room_device_id == item) {
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
    this.bookingService.getEditBookingById(booking_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.pathFormBooking(res.data)
        }
      }
    })
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
    form.link = this.formBooking.controls['link'].value;

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
        this.alertService.submitAlert("บันทึกการแก้ไขคำร้อง?").subscribe((confirm: any) => {
          if (confirm) {
            this.bookingService.adminUpdateBooking(this.data.booking_id, form).subscribe((res: any) => {
              if (res) {
                if (res.status == 1) {
                  this.alertService.successAlert(res.msg)
                  this.dialogRef.close(true)
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

  onCancel() {
    this.alertService
      .ensureDeleteAlert('ต้องยกเลิกการแก้ไขใช่หรือไม่?')
      .subscribe((result: any) => {
        if (result) {
          this.dialogRef.close()
        }
      });
  }
}

