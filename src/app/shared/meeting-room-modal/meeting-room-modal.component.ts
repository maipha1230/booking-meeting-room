import { AlertService } from './../../services/alert.service';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { MeetingRoomModel } from './../../model/meeting-room.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-meeting-room-modal',
  templateUrl: './meeting-room-modal.component.html',
  styleUrls: ['./meeting-room-modal.component.scss'],
})
export class MeetingRoomModalComponent implements OnInit {
  public formMeeting: FormGroup;

  public meetingRoomSizeList: any = [];
  public meetingRoomStatusList: any = [];

  public meetingRoom: any = [];
  public preview_img: any = [];

  constructor(
    private dialogRef: MatDialogRef<MeetingRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private meetingRoomService: MeetingRoomService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getMeetingRoomSize();
    this.getMeetingRoomStatus();
    this.createMeetingForm();
    if (this.data) {
      this.pathMeetingForm(this.data);
    }
  }

  getMeetingRoomSize() {
    this.meetingRoomService.getMeetingRoomSize().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meetingRoomSizeList = res.data;
        }
      }
    });
  }

  getMeetingRoomStatus() {
    this.meetingRoomService.getMeetingRoomStatus().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meetingRoomStatusList = res.data;
        }
      }
    });
  }

  createMeetingForm() {
    this.formMeeting = this.formBuilder.group({
      roomName: ['', Validators.required],
      roomSize: [null, Validators.required],
      roomCapacity: [null, Validators.required],
      roomStatus: [null, Validators.required],
      roomGallery: [null, Validators.required],
    });
  }

  pathMeetingForm(room: MeetingRoomModel) {
    this.formMeeting.patchValue({
      roomName: room.room_name,
      roomSize: room.room_size_id,
      roomCapacity: room.room_capacity,
      roomStatus: room.room_status_id,
    });

    let gallery:any  = []
    for (let i = 0; i < room.room_gallery.length; i++) {
      // let file: any = room.room_gallery[i];
      // if (file) {
      //   let reader = new FileReader();
      //   reader.readAsDataURL(file); // read file as data url
      //   reader.onload = (event) => {
      //     // called once readAsDataURL is completed
      //     gallery.push(event.target?.result);
      //   };
      // }
      this.toDataUrl(room.room_gallery[i], function(myBase64: any) {
        // console.log(myBase64); // myBase64 is the base64 string
        gallery.push(myBase64)
    });
    }
    this.formMeeting.controls['roomGallery'].setValue(gallery);
  }

  fileChangeEvent(event: any) {
    let gallery: any = [];
    if (event.target.files.length + gallery.length <= 3) {
      for (let i = 0; i < event.target.files.length; i++) {
        let file: File = event.target.files[i];
        if (file) {
          let reader = new FileReader();
          reader.readAsDataURL(file); // read file as data url
          reader.onload = (event) => {
            // called once readAsDataURL is completed
            gallery.push(event.target?.result);
          };
        }
      }
      this.formMeeting.controls['roomGallery'].setValue(gallery);
    } else {
      console.log('จำกัดมากสุด 3 รูปภาพ');
    }
  }

  public toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  onSave() {
    const room = this.prepareForm();
    let formData = new FormData();
    formData.append('room_name', room.room_name);
    formData.append('room_size_id', String(room.room_size_id));
    formData.append('room_capacity', String(room.room_capacity));
    formData.append('room_status_id', String(room.room_status_id));

    for (let i = 0; i < room.room_gallery.length; i++) {
      formData.append('gallery', base64ToFile(room.room_gallery[i]));
    }

    this.meetingRoomService
      .createMeetingRoom(formData)
      .subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            this.alertService.successAlert(res.msg);
            this.dialogRef.close(true);
          }
        }
      });
  }

  prepareForm(): MeetingRoomModel {
    const room = new MeetingRoomModel();
    room.room_name = this.formMeeting.controls['roomName'].value;
    room.room_size_id = this.formMeeting.controls['roomSize'].value;
    room.room_capacity = this.formMeeting.controls['roomCapacity'].value;
    room.room_gallery = this.formMeeting.controls['roomGallery'].value;
    room.room_status_id = this.formMeeting.controls['roomStatus'].value;

    return room;
  }
}
