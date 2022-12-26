import { MeetingRoomService } from './../../services/meeting-room.service';
import { OtherSettingModalComponent } from './../../shared/other-setting-modal/other-setting-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-other-setting',
  templateUrl: './other-setting.component.html',
  styleUrls: ['./other-setting.component.scss']
})
export class OtherSettingComponent implements OnInit {

  public meetingRoomSizeList: any = []
  constructor(private dialog: MatDialog, private meetingRoomService: MeetingRoomService) { }

  ngOnInit(): void {
    // this.getMeetingRoomSize();
  }


  // getMeetingRoomSize() {
  //   this.meetingRoomService.getMeetingRoomSize().subscribe((res: any) => {
  //     if (res) {
  //       if (res.status == 1) {
  //         this.meetingRoomSizeList = res.data
  //       }
  //     }
  //   })
  // }

  // onAddMeetingRoomSize(){
  //   let dialogRef = this.dialog.open(OtherSettingModalComponent, {
  //     width: '50%',
  //     minWidth: '400px',
  //     height: 'auto',
  //     data: {
  //       title_modal: 'เพิ่มขนาดห้องประชุม',
  //       name_input: 'ขนาดห้องประชุม'
  //     }
  //   })

  //   dialogRef.afterClosed().subscribe((res: any) => {
  //     if (res) {
  //       if (res.data) {
  //         let name = res.data
  //         this.meetingRoomService.createMeetingRoomSize(name).subscribe((response: any) => {
  //           if (response) {
  //             if (response.status == 1) {
  //               console.log(res.msg);
  //               this.getMeetingRoomSize()
  //             }
  //           }
  //         })
  //       }
  //     }

  //   })
  // }

  // updateMeetingRoomSize(meetingRoomSize: any){
  //   let id = meetingRoomSize.room_size_id
  //   let dialogRef = this.dialog.open(OtherSettingModalComponent, {
  //     width: '50%',
  //     minWidth: '400px',
  //     height: 'auto',
  //     data: {
  //       title_modal: 'แก้ไขขนาดห้องประชุม',
  //       name_input: 'ขนาดห้องประชุม',
  //       name_value: meetingRoomSize.name
  //     }
  //   })

  //   dialogRef.afterClosed().subscribe((res: any) => {
  //     if (res) {
  //       if (res.data) {
  //         let name = res.data
  //         this.meetingRoomService.updateMeetingRoomSize(id, name).subscribe((response: any) => {
  //           if (response) {
  //             if (response.status == 1) {
  //               console.log(response.msg);
  //               this.getMeetingRoomSize();
  //             }
  //           }
  //         })
  //       }
  //     }

  //   })
  // }

  // removeMeetingRoomSize(id: number) {
  //   this.meetingRoomService.removeMeetingRoomSize(id).subscribe((res: any) => {
  //     if (res) {
  //       if (res.status == 1) {
  //         console.log(res.msg);
  //         this.getMeetingRoomSize();
  //       }
  //     }
  //   })
  // }

}
