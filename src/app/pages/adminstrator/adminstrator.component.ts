import { AdminModalComponent } from './../../shared/admin-modal/admin-modal.component';
import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersModel } from './../../model/users.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminstrator',
  templateUrl: './adminstrator.component.html',
  styleUrls: ['./adminstrator.component.scss']
})
export class AdminstratorComponent implements OnInit {

  public users: UsersModel[] = []

  constructor(private dialog: MatDialog, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this.userService.getAdmins().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.users = res.data
        }
      }
    })
  }

  onAddAdmin(){
    let dialogRef = this.dialog.open(AdminModalComponent, {
      width: "auto",
      minWidth: "400px",
      height: "95%",
    })

    dialogRef.afterClosed().subscribe((res:any) => {
      if (res) {
          this.getAdmins();
      }
    })
  }

  onEditAdmin(user_id: number) {
    let dialogRef = this.dialog.open(AdminModalComponent, {
      width: "auto",
      minWidth: "400px",
      height: "95%",
      data: {
        user_id: user_id
      }
    })

    dialogRef.afterClosed().subscribe((res:any) => {
      if (res) {
          this.getAdmins();
      }
    })
  }

  onRemoveAdmin(user_id: number) {
    this.alertService.ensureDeleteAlert("ต้องการลบผู้ใช้งานใช่หรือไม่?").subscribe((result) => {
      if (result) {
        this.userService.removeAdmin(user_id).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg)
              this.getAdmins();
            }
          }
        })
      }
    })
  }

}
