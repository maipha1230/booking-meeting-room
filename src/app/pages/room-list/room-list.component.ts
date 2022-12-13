import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import SwiperCore, {Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,} from 'swiper';
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public room_list: any[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getMeetingRoomList();
  }

  getMeetingRoomList(){
    this.userService.getMeetingRoomList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.room_list = res.data
        }
      }
    })
  }

}
