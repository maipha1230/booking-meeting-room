import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

  public sideBarShow: Boolean = false;
  constructor(private eventService: EventService) {
    this.eventService.getSideBar().subscribe((res: any) => {
      if (res) {
        this.sideBarShow = !this.sideBarShow
      }
    })
  }

  ngOnInit(): void {
  }

  onClose(){
    this.eventService.setSideBar()
  }

}
