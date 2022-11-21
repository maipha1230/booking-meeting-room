import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingRoomModalComponent } from 'src/app/shared/meeting-room-modal/meeting-room-modal.component';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.scss']
})
export class MeetingRoomComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public onAddRoom(){
    let dialogRef = this.dialog.open(MeetingRoomModalComponent, {
      height: '95%',
      width: '50%',
      minWidth: '400px'
    })
  }

}
