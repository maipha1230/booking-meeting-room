import { MeetingRoomModel } from './../../model/meeting-room.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-room-modal',
  templateUrl: './meeting-room-modal.component.html',
  styleUrls: ['./meeting-room-modal.component.scss']
})
export class MeetingRoomModalComponent implements OnInit {

  public formMeeting: FormGroup;


  constructor(private dialogRef: MatDialogRef<MeetingRoomModalComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createMeetingForm();
  }

  createMeetingForm(){
    this.formMeeting = this.formBuilder.group({
      roomName: ["", Validators.required],
      roomSize: [null, Validators.required],
      roomCapacity: [null, Validators.required],
      roomStatus: [null, Validators.required],
      roomGallerty: [null, Validators.required]
    })
  }

  onSave(){
    if (this.formMeeting.valid) {
    const room = this.prepareForm();
    let formData = new FormData();
    formData.append("roomName", room.roomName)
    formData.append("roomSize", String(room.roomSize))
    formData.append("roomCapacity", String(room.roomCapacity))
    formData.append("roomStatus", String(room.roomStatus))

    for (let i = 0; i < room.roomGallery.length; i++) {
      formData.append("gallery", room.roomGallery[i].file)
    }

    }


  }
  prepareForm(): MeetingRoomModel{
    const room = new MeetingRoomModel();
    room.roomName = this.formMeeting.controls['roomName'].value
    room.roomSize = this.formMeeting.controls['roomSize'].value
    room.roomCapacity = this.formMeeting.controls['roomCapacity'].value
    room.roomGallery = this.formMeeting.controls['roomGallery'].value
    room.roomStatus = this.formMeeting.controls['roomStatus'].value

    return room;
  }

}
