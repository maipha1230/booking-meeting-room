import { OtherSettingModalComponent } from './../../shared/other-setting-modal/other-setting-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-other-setting',
  templateUrl: './other-setting.component.html',
  styleUrls: ['./other-setting.component.scss']
})
export class OtherSettingComponent implements OnInit {

  public meetingRoomSizeList: any = []
  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.getMeetingRoomSize();
  }


  getMeetingRoomSize() {
    this.http.get(`http://localhost:3000/api/admin/getMeetingRoomSize`).subscribe((res: any) => {
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
          this.http.post(`http://localhost:3000/api/admin/createMeetingRoomSize`, { name: name }).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                console.log(res.msg);
                this.getMeetingRoomSize();
              }
            }
          })
        }
      }

    })
  }

}
