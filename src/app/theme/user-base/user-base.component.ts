import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.scss']
})
export class UserBaseComponent implements OnInit {
  public sideBarShow: Boolean = false;
  constructor(private eventService: EventService) {
    this.eventService.userGetSideBar().subscribe((res: any) => {
      if (res) {
        this.sideBarShow = !this.sideBarShow
      }
    })
   }

  ngOnInit(): void {
  }

  onClose(){
    this.eventService.userSetSideBar()
  }

}
