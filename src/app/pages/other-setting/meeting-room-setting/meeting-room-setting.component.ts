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
  constructor(private dialog: MatDialog, private meetingRoomService: MeetingRoomService) { }

  ngOnInit(): void {
    this.getMeetingRoomSize();
    this.getMeetingRoomStatus();
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
                console.log(res.msg);
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
                console.log(response.msg);
                this.getMeetingRoomSize();
              }
            }
          })
        }
      }

    })
  }

  removeMeetingRoomSize(id: number) {
    this.meetingRoomService.removeMeetingRoomSize(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getMeetingRoomSize();
        }
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
                console.log(res.msg);
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
                console.log(response.msg);
                this.getMeetingRoomStatus();
              }
            }
          })
        }
      }

    })
  }

  removeMeetingRoomStatus(id: number) {
    this.meetingRoomService.removeMeetingRoomStatus(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getMeetingRoomStatus();
        }
      }
    })
  }



}
