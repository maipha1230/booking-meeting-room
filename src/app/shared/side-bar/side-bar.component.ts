import { EventService } from './../../services/event.service';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  menu_list: any = [
    {
      id: 1,
      name: 'แดชบอร์ด',
      link: '/admin',
    },
    {
      id: 2,
      name: 'คำร้องขอการใช้ห้องประชุม',
      link: '/admin/booking-room',
    },
    {
      id: 3,
      name: 'ห้องประชุม',
      link: '/admin/meeting-room',
    },
    {
      id: 4,
      name: 'อุปกรณ์การใช้งาน',
      link: '/admin/device',
    },
    {
      id: 5,
      name: 'ผู้ใช้งาน',
      link: '/admin/user',
    },
    {
      id: 6,
      name: 'ผู้ดูแลระบบ',
      link: '/admin/adminstrator',
    },
    {
      id: 7,
      name: 'ประวัติการใช้งานห้องประชุม',
      link: '/admin/history',
    },
    {
      id: 8,
      name: 'การตั้งค่าอื่นๆ',
      link: '/admin/other-setting',
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
  }

  public route(path: string) {
    this.router.navigate([path]);
  }
}
