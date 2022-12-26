import { AlertService } from './../../services/alert.service';
import { UsersModel } from './../../model/users.model';
import { UserService } from 'src/app/services/user.service';
import { UserModalComponent } from './../../shared/user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: UsersModel[] = []

  constructor(private dialog: MatDialog, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.userService.getUsers().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.users = res.data
        }
      }
    })
  }

  onAddUser(){
    let dialogRef = this.dialog.open(UserModalComponent, {
      width: "auto",
      minWidth: '400px',
      height: "95%",
    })

    dialogRef.afterClosed().subscribe((res:any) => {
      if (res) {
          this.getUsers();
      }
    })
  }

  onEditUser(user_id: number) {
    let dialogRef = this.dialog.open(UserModalComponent, {
      width: "auto",
      minWidth: "400px",
      height: "95%",
      data: {
        user_id: user_id
      }
    })

    dialogRef.afterClosed().subscribe((res:any) => {
      if (res) {
          this.getUsers();
      }
    })
  }

  onRemoveUser(user_id: number) {

    this.alertService.ensureDeleteAlert("ต้องการลบผู้ใช้งานใช่หรือไม่?").subscribe((result) => {
      if (result) {
        this.userService.removeUser(user_id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getUsers();
            }
          }
        })
      }
    })
  }

}
