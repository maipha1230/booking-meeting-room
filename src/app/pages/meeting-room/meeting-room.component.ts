import { AlertService } from './../../services/alert.service';
import { MeetingRoomService } from './../../services/meeting-room.service';
import { MeetingRoomModel } from './../../model/meeting-room.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MeetingRoomModalComponent } from 'src/app/shared/meeting-room-modal/meeting-room-modal.component';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {

  public meeting_room_list: MeetingRoomModel[] = []

  constructor(private dialog: MatDialog, private meetingRoomService: MeetingRoomService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getMeetingRoom();
  }

  getMeetingRoom(){
    this.meetingRoomService.getMeetingRoom().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meeting_room_list = res.data
        }
      }
    })
  }

  public onAddRoom(){
    let dialogRef = this.dialog.open(MeetingRoomModalComponent, {
      height: '95%',
      width: '50%',
      minWidth: '400px'
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getMeetingRoom();
      }
    })
  }

  public onEditRoom(id: any){
    let room_id:number = id
    let dialogRef = this.dialog.open(MeetingRoomModalComponent, {
      height: '95%',
      width: '50%',
      minWidth: '400px',
      data: {
        room_id: room_id
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getMeetingRoom();
      }
    })
  }

  public onRemoveMeetingRoom(room_id: any) {
    this.alertService.ensureDeleteAlert("คุณต้องการลบห้องประชุมใช่หรือไม่?").subscribe((res: any) => {
      if (res) {
        this.meetingRoomService.removeMeetingRoom(Number(room_id)).subscribe((response: any) => {
          if (response) {
            if (response.status == 1) {
              this.alertService.successAlert(response.msg)
              this.getMeetingRoom();
            }
          }
        })
      }
    })
  }

}
