import { base64ToFile } from 'ngx-image-cropper';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { AlertService } from './../../services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss'],
})
export class DeviceModalComponent implements OnInit {
  public image_device: any = null;
  public image_upload_status: boolean = false;
  formDevice: FormGroup;
  constructor(
    private formBuilber: FormBuilder,
    private dialogRef: MatDialogRef<DeviceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private meetingRoomService: MeetingRoomService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.createFormDevice();
    if (this.data) {
      if (this.data.room_device_id) {
        this.getMeetingRoomDeviceById(this.data.room_device_id)
      }
    }
  }


  createFormDevice(){
    this.formDevice = this.formBuilber.group({
      name: ['', Validators.required],
    })
  }

  pathFormDevice(data: any){
    this.formDevice.patchValue({
      name: data.name
    })
  }

  getMeetingRoomDeviceById(room_device_id: number) {
    this.meetingRoomService.getMeetingRoomDeviceById(room_device_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.image_device = res.data.img_path
          this.pathFormDevice(res.data);
        }
      }
    })
  }

  fileChangeEvent(event: any) {
    let file: File = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.image_device = event.target?.result;
        this.image_upload_status = true;
      };
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

  onSaveDevice() {
    if (!this.image_device) {
      this.alertService.warningAlert("กรุณาอัพโหลดรูปภาพ");
    } else {
      const name = this.formDevice.controls['name'].value
      const formData = new FormData();
      formData.append('name', name)
      if (this.image_device && this.image_upload_status) {
        formData.append('gallery', base64ToFile(this.image_device))
      }

      if (this.data) {
        this.meetingRoomService.updateMeetingRoomDevice(this.data.room_device_id, formData).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg);
              this.dialogRef.close(true)
            }
          }
        })
      } else {
        this.meetingRoomService.createMeetingRoomDevice(formData).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.dialogRef.close(true)
            }
          }
        })
      }
    }
  }
}
