import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { UserService } from './../../services/user.service';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public room_list: any = [];
  public purpose_list: any = [];
  public device_list: any = [];

  public formBooking: FormGroup;

  constructor(
    private meetingRoomService: MeetingRoomService,
    private userService: UserService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRoomList();
    this.getBookingPurposeList();
    this.getRoomDeviceList();
    this.createFormBooking();
  }

  createFormBooking(){
    this.formBooking = this.formBuilder.group({
      room: [null, Validators.required],
      title: ['', Validators.required],
      purpose: [1, Validators.required],
      quantity: ['', Validators.required],
      device: [[]],
      date: [null, Validators.required],
      time_from: [null, Validators.required],
      time_to: [null, Validators.required]
    })
  }

  getRoomList() {
    this.meetingRoomService.getRoomList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.room_list = res.data
        }
      }
    })
  }

  getBookingPurposeList() {
    this.meetingRoomService.getBookingPurposeList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.purpose_list = res.data
        }
      }
    })
  }

  getRoomDeviceList() {
    this.meetingRoomService.getRoomDeviceList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.device_list = res.data
        }
      }
    })
  }

  onSubmitBookingForm(){
    if (this.device_list.length > 0) {
      this.device_list = this.device_list.filter((device: any) => {
        return device.selected == true
      })
    } else {
      this.device_list = null
    }
    this.formBooking.controls['device'].setValue(this.device_list)
    console.log(this.formBooking.value);

  }

}
