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

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.adminLogin = this.authService.isAdminLogin();
  }

  onLogout(){
    this.authService.onLogout();
    this.alertService.successAlert("ออกจากระบบสำเร็จ")
  }

}
