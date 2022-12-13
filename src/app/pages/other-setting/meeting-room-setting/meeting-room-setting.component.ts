import { UserService } from 'src/app/services/user.service';
import { AlertService } from './../../../services/alert.service';
import { OtherSettingModalComponent } from './../../../shared/other-setting-modal/other-setting-modal.component';
import { MeetingRoomService } from './../../../services/meeting-room.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-room-setting',
  templateUrl: './meeting-room-setting.component.html',
  styleUrls: ['./meeting-room-setting.component.scss']
})
export class MeetingRoomSettingComponent implements OnInit {

  public meetingRoomSizeList: any = []
  public meetingRoomStatusList: any = []
  public line_token: any = []
  constructor(private dialog: MatDialog, private meetingRoomService: MeetingRoomService, private alertService: AlertService, private userService: UserService) { }

  ngOnInit(): void {
    this.getMeetingRoomSize();
    this.getMeetingRoomStatus();
    this.getLineNotify();
  }


  getMeetingRoomSize() {
    this.meetingRoomService.getMeetingRoomSize().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meetingRoomSizeList = res.data
        }
      }
    })
  }

  onAddMeetingRoomSize(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มขนาดห้องประชุม',
        name_input: 'ขนาดห้องประชุม'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.meetingRoomService.createMeetingRoomSize(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getMeetingRoomSize()
              }
            }
          })
        }
      }

    })
  }

 updateMeetingRoomSize(meetingRoomSize: any){
    let id = meetingRoomSize.room_size_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขขนาดห้องประชุม',
        name_input: 'ขนาดห้องประชุม',
        name_value: meetingRoomSize.name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.meetingRoomService.updateMeetingRoomSize(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getMeetingRoomSize();
              }
            }
          })
        }
      }

    })
  }

  removeMeetingRoomSize(id: number) {
    this.alertService.ensureDeleteAlert("ต้องการลบใช่หรือไม่ หากคุณลบห้องประชุมที่ใช้ขนาดนี้จะถูกลบไปด้วย").subscribe((result: any) => {
      if (result) {
        this.meetingRoomService.removeMeetingRoomSize(id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getMeetingRoomSize();
            }
          }
        })
      }
    })
  }
  getMeetingRoomStatus() {
    this.meetingRoomService.getMeetingRoomStatus().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meetingRoomStatusList = res.data
        }
      }
    })
  }

  onAddMeetingRoomStatus(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มสถานะห้องประชุม',
        name_input: 'สถานะห้องประชุม'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.meetingRoomService.createMeetingRoomStatus(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getMeetingRoomStatus()
              }
            }
          })
        }
      }

    })
  }

  updateMeetingRoomStatus(meetingRoomStatus: any){
    let id = meetingRoomStatus.room_status_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขสถานะห้องประชุม',
        name_input: 'สถานะห้องประชุม',
        name_value: meetingRoomStatus.name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.meetingRoomService.updateMeetingRoomStatus(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getMeetingRoomStatus();
              }
            }
          })
        }
      }

    })
  }

  removeMeetingRoomStatus(id: number) {
    this.alertService.ensureDeleteAlert("ต้องการลบใช่หรือไม่ หากคุณลบห้องประชุมที่ใช้สถานะนี้จะถูกลบไปด้วย").subscribe((result: any) => {
      if (result) {
        this.meetingRoomService.removeMeetingRoomStatus(id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getMeetingRoomStatus();
            }
          }
        })
      }
    })
  }

  createLineNotify(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มโทเคนการแจ้งเตือนไลน์ Notify',
        name_input: 'โทเคน'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let token = res.data
          this.userService.createLineNotify(token).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(res.msg)
                this.getLineNotify();
              }
            }
          })
        }
      }

    })
  }

  getLineNotify(){
    this.userService.getLineNotify().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.line_token = res.data
        }
      }
    })
  }

  updateLineNotify(line_token: any) {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มโทเคนการแจ้งเตือนไลน์ Notify',
        name_input: 'โทเคน',
        name_value: line_token.token

      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let token = res.data
          this.userService.updateLineNotify(line_token.line_notify_id , token).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(res.msg)
                this.getLineNotify();
              }
            }
          })
        }
      }

    })
  }

  removeLineNotify(line_notify_id: number){
    this.alertService.ensureDeleteAlert("ต้องการลบโทเคนใช่หรือไม่? หากลบจะไม่มีการแจ้งเตือนการจองห้องประชุม").subscribe((confirm: any) => {
      if (confirm) {
        this.userService.removeLineNotify(line_notify_id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getLineNotify();
            }
          }
        })
      }
    })
  }



}
