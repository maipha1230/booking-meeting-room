import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss']
})
export class UserToolbarComponent implements OnInit {

  public adminLogin: boolean = false;
  public isLoggedin: boolean = false;

  constructor(private authService: AuthService, private alertService: AlertService) { }

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
}
