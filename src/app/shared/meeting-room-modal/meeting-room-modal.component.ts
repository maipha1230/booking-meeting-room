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

  public meetingRoom: MeetingRoomModel;

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
      if (this.data.room_id) {
        this.getMeetingRoomById(this.data.room_id);
      }
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

  getMeetingRoomById(room_id: any) {
    this.meetingRoomService
      .getMeetingRoomById(room_id)
      .subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            this.meetingRoom = res.data;
            this.pathMeetingForm(this.meetingRoom);
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
      roomGallery: [[], Validators.required],
      roomColor: ['#2674d9', Validators.required]
    });
  }

  pathMeetingForm(room: MeetingRoomModel) {
    this.formMeeting.patchValue({
      roomName: room.room_name,
      roomSize: room.room_size_id,
      roomCapacity: room.room_capacity,
      roomStatus: room.room_status_id,
      roomColor: room.room_color
    });

    let gallery: any = [];
    for (let i = 0; i < room.room_gallery.length; i++) {
      this.toDataUrl(room.room_gallery[i].img_path, function (myBase64: any) {
        gallery.push(myBase64);
      });
    }
    this.formMeeting.controls['roomGallery'].setValue(gallery);
    console.log(this.formMeeting.controls['roomGallery'].value);
  }

  fileChangeEvent(event: any) {
    let gallery: any[] = [];
    if (this.formMeeting.controls['roomGallery'].value.length > 0) {
      for (
        let i = 0;
        i < this.formMeeting.controls['roomGallery'].value.length;
        i++
      ) {
        gallery.push(this.formMeeting.controls['roomGallery'].value[i]);
      }
    }
    if (event.target.files.length + gallery.length <= 3) {
      for (let i = 0; i < event.target.files.length; i++) {
        let file: File = event.target.files[i];
        if (file) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
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
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  onSave() {
    if (this.formMeeting.controls['roomGallery'].value.length <= 0) {
      this.alertService.warningAlert('กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูปภาพ');
    } else {
      if (this.data) {
        this.formMeeting.controls['roomGallery'].value.splice(
          0,
          this.meetingRoom.room_gallery.length
        );
      }
      const room = this.prepareForm();
      let formData = new FormData();
      formData.append('room_name', room.room_name);
      formData.append('room_size_id', String(room.room_size_id));
      formData.append('room_capacity', String(room.room_capacity));
      formData.append('room_status_id', String(room.room_status_id));
      formData.append('room_color', String(room.room_color));
      for (let i = 0; i < room.room_gallery.length; i++) {
        formData.append('gallery', base64ToFile(room.room_gallery[i]));
      }
      if (this.data) {
        this.meetingRoomService.updateMeetingRoom( Number(this.meetingRoom.room_id), formData).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.dialogRef.close(true);
            }
          }
        })
      } else {
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
    }
  }

  prepareForm(): MeetingRoomModel {
    const room = new MeetingRoomModel();
    room.room_name = this.formMeeting.controls['roomName'].value;
    room.room_size_id = this.formMeeting.controls['roomSize'].value;
    room.room_capacity = this.formMeeting.controls['roomCapacity'].value;
    room.room_gallery = this.formMeeting.controls['roomGallery'].value;
    room.room_status_id = this.formMeeting.controls['roomStatus'].value;
    room.room_color = this.formMeeting.controls['roomColor'].value;

    return room;
  }

  onRemoveImage(index: number) {
    console.log(index);
    if (this.formMeeting.controls['roomGallery'].value.length == 1) {
      this.alertService.warningAlert("ไม่สามารถลบรูปภาพออกทั้งหมด");
    } else {
      if (this.data) {
        if (index > this.meetingRoom.room_gallery.length - 1) {
          this.alertService
            .ensureDeleteAlert('ต้องการลบรูปภาพใช่หรือไม่')
            .subscribe((res: any) => {
              if (res) {
                this.formMeeting.controls['roomGallery'].value.splice(index, 1);
              }
            });
        } else {
          this.alertService
            .ensureDeleteAlert('ต้องการลบรูปภาพใช่หรือไม่')
            .subscribe((res: any) => {
              if (res) {
                this.meetingRoomService
                  .removeMeetingRoomImage(
                    this.meetingRoom.room_gallery[index].img_name
                  )
                  .subscribe((response: any) => {
                    if (response) {
                      if (response.status == 1) {
                        console.log(response.msg);
                        this.meetingRoom.room_gallery.splice(index, 1);
                        this.formMeeting.controls['roomGallery'].value.splice(
                          index,
                          1
                        );
                      }
                    }
                  });
              }
            });
        }
      }
    }

  }

}
