import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { environment } from './../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  admin_list: any[] = [];
  user_list: any[] = [];

  formUser: FormGroup;
  formAdmin: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    if (this.authService.isAdminLogin()) {
      this.router.navigate(['/admin'])
    }

    if (this.authService.isUserLogin()){
      this.router.navigate(['/'])
    }
    this.getUsers();
    this.getAdmin();
    this.createFormUser();
    this.createFormAdmin();
  }

  getUsers() {
    this.userService.getUserLoginForm().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.user_list = res.data;
        }
      }
    });
  }

  createFormUser() {
    this.formUser = this.formBuilder.group({
      username: [null, Validators.required],
      password: ['', Validators.required],
    });
  }

  createFormAdmin() {
    this.formAdmin = this.formBuilder.group({
      username: [null, Validators.required],
      password: ['', Validators.required],
    });
  }

  getAdmin() {
    this.userService.getAdminLoginForm().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.admin_list = res.data;
        }
      }
    });
  }

  onLoginUser() {
    if (this.formUser.valid) {
      const user_id: number = this.formUser.controls['username'].value;
      const password: string = this.formUser.controls['password'].value;

      this.userService.userLogin(user_id, password).subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            if (res.token) {
              localStorage.setItem(environment.login_token, res.token);
              this.alertService.successAlert(res.msg);
              this.router.navigate(['/'])
            }
            this.alertService.successAlert(res.msg);
          } else if (res.status == 2) {
            this.alertService.bannedUserAlert(res.msg);
          } else if (res.status == 3) {
            this.alertService.warningAlert(res.msg);
          } else if (res.status == 4) {
            this.alertService.warningAlert(res.msg);
          }
        }
      });
    }
  }

  onLoginAdmin() {
    if (this.formAdmin.valid) {
      const user_id: number = this.formAdmin.controls['username'].value;
      const password: string = this.formAdmin.controls['password'].value;

      this.userService.adminLogin(user_id, password).subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            if (res.token) {
              localStorage.setItem(environment.login_token, res.token);
              setTimeout(() => {
                this.alertService.successAlert(res.msg);
              }, 2000)
              this.router.navigate(['/admin'])
            }
          } else if (res.status == 2) {
            this.alertService.bannedUserAlert(res.msg);
          } else if (res.status == 3) {
            this.alertService.warningAlert(res.msg);
          } else if (res.status == 4) {
            this.alertService.warningAlert(res.msg);
          }
        }
      });
    }
  }
}
