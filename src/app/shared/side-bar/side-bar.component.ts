import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  menu_list: any = [
    {
      id: 1,
      name: "แดชบอร์ด",
      link: ""
    },
    {
      id: 2,
      name: "คำร้องขอการใช้ห้องประชุม",
      link: "/booking-room"
    },
    {
      id: 3,
      name: "ห้องประชุม",
      link: "/meeting-room"
    },
    {
      id: 4,
      name: "อุปกรณ์การใช้งาน",
      link: "/device"
    },
    {
      id: 5,
      name: "ผู้ใช้งาน",
      link: "/user"
    },
    {
      id: 6,
      name: "ผู้ดูแลระบบ",
      link: "/adminstrator"
    },
    {
      id: 7,
      name: "ประวัติการใช้งานห้องประชุม",
      link: "/history"
    },
    {
      id: 8,
      name: "การตั้งค่าอื่นๆ",
      link: "/other-setting"

    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public route(path:string){
    this.router.navigate([path])
  }

}
