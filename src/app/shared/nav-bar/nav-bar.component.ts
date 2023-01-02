import { EventService } from './../../services/event.service';
import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public user: any = null;
  public sideBarState = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private eventService: EventService
  ) {
    this.eventService.getAdminNav().subscribe((res: any) => {
      if (res) {
        this.getAdminNav();
      }
    })
  }

  ngOnInit(): void {
    this.getAdminNav();
  }

  getAdminNav() {
    this.userService.getAdminNav().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.user = res.data;
        }
      }
    });
  }

  onLogout() {
    this.alertService
      .ensureAlert('ต้องการออกจากระบบใช่หรือไม่?')
      .subscribe((confirm: any) => {
        if (confirm) {
          this.authService.onLogout();
          this.alertService.successAlert('ออกจากระบบสำเร็จ');
        }
      });
  }

  sideBarToggle() {
    this.sideBarState = !this.sideBarState;
    this.eventService.setSideBar()
  }
}
