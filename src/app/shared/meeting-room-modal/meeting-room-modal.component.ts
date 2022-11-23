import { MeetingRoomService } from './../../services/meeting-room.service';
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

  public meetingRoomSizeList: any = []
  public meetingRoomStatusList: any = []

  public meetingRoom: any = []
  public gallery:any = []
  public preview_img: any = []

  constructor(private dialogRef: MatDialogRef<MeetingRoomModalComponent>,
    private formBuilder: FormBuilder,
    private meetingRoomService: MeetingRoomService) { }

  ngOnInit(): void {
    this.getMeetingRoomSize();
    this.getMeetingRoomStatus();
    this.createMeetingForm();
  }

  getMeetingRoomSize(){
    this.meetingRoomService.getMeetingRoomSize().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meetingRoomSizeList = res.data
        }
      }

    })
  }

  getMeetingRoomStatus(){
    this.meetingRoomService.getMeetingRoomStatus().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.meetingRoomStatusList = res.data
        }
      }
    })
  }

  createMeetingForm(){
    this.formMeeting = this.formBuilder.group({
      roomName: ["", Validators.required],
      roomSize: [null, Validators.required],
      roomCapacity: [null, Validators.required],
      roomStatus: [null, Validators.required],
      roomGallery: [null, Validators.required]
    })
  }

  fileChangeEvent(event: any){
    if (event.target.files.length + this.gallery.length <= 3) {
      for(let i = 0; i < event.target.files.length; i++){
        let file: File = event.target.files[i]
        if (file){
          let reader = new FileReader();
          reader.readAsDataURL(file); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.gallery.push(event.target?.result)
          }
        }
      }
      this.formMeeting.controls['roomGallery'].setValue(this.gallery)
      console.log(this.formMeeting.controls['roomGallery'].value);
    } else {
      console.log("จำกัดมากสุด 3 รูปภาพ");

    }

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
