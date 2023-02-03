import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  public room_list: any[] = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMeetingRoomList();
  }

  getMeetingRoomList() {
    this.userService.getMeetingRoomList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.room_list = res.data;
        }
      }
    });
  }

  onRoomClick(room_id: number, room_name: string) {
    this.alertService.ensureAlert(`ต้องการจอง ${room_name} ใช่หรือไม่`).subscribe((confirm: any) => {
      if (confirm) {
        this.router.navigate(['/booking-meeting-room'], { queryParams: { room_id: room_id } })
      }
    })
  }
}
