import { DeviceModalComponent } from './../../shared/device-modal/device-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './../../services/alert.service';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  device_list: any = []
  constructor(private meetingRoomService: MeetingRoomService, private alertService: AlertService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMeetingRoomDevice();
  }

  getMeetingRoomDevice(){
    this.meetingRoomService.getMeetingRoomDevice().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.device_list = res.data
        }
      }
    })
  }

  onAddDevice(){
    let dialogRef = this.dialog.open(DeviceModalComponent, {
      width: "auto",
      minWidth: "400px",
      height: "auto",
    })

    dialogRef.afterClosed().subscribe((res:any) => {
      if (res) {
          this.getMeetingRoomDevice();
      }
    })
  }

  onEditDevice(room_device_id: number) {
    let dialogRef = this.dialog.open(DeviceModalComponent, {
      width: "auto",
      minWidth: "400px",
      height: "auto",
      data: {
        room_device_id: room_device_id
      }
    })

    dialogRef.afterClosed().subscribe((res:any) => {
      if (res) {
          this.getMeetingRoomDevice();
      }
    })
  }

  onRemoveDevice(room_device_id: number) {
    this.alertService.ensureDeleteAlert("ต้องการลบอุปกรณ์ใช่หรือไม่?").subscribe((result) => {
      if (result) {
        this.meetingRoomService.removeMeetingRoomDevice(room_device_id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getMeetingRoomDevice();
            }
          }
        })
      }
    })
  }

}
