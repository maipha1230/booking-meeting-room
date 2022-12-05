import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public user: any = null
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAdminNav();
  }

  getAdminNav(){
    this.userService.getAdminNav().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.user = res.data
        }
      }
    })
  }

  onLogout(){
    this.authService.onLogout();
  }

}
