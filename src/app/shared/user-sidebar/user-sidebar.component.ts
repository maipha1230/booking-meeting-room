import { EventService } from './../../services/event.service';
import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  public adminLogin: boolean = false;
  public isLoggedin: boolean = false;
  constructor(private authService: AuthService, private alertService: AlertService, private eventService: EventService) {
   }

  ngOnInit(): void {
    this.adminLogin = this.authService.isAdminLogin();
    this.isLoggedin = this.authService.isUserLogin();
  }

  onLogout(){
    this.alertService.ensureAlert("ต้องการออกจากระบบใช่หรือไม่?").subscribe((confirm: any) => {
      if (confirm) {
        this.authService.onLogout();
        this.alertService.successAlert("ออกจากระบบสำเร็จ")
      }
    })
  }

  onMenuClick(){
    this.eventService.userSetSideBar()
  }

}
