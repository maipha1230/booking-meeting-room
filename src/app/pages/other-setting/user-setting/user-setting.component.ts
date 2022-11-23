import { OtherSettingModalComponent } from './../../../shared/other-setting-modal/other-setting-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {

  public userAffiliationList: any = []
  public userPositionList: any = []
  public userRankList: any = []
  public userTypeList: any = []
  public userRoleList: any = []

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserAffiliation();
    this.getUserPosition();
    this.getUserRank();
    this.getUserType();
    this.getUserRole();
  }


  getUserAffiliation() {
    this.userService.getUserAffiliation().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userAffiliationList = res.data
        }
      }
    })
  }

  onAddUserAffiliation(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มสังกัดผู้ใช้งาน',
        name_input: 'สังกัดผู้ใช้งาน'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.createUserAffiliation(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserAffiliation()
              }
            }
          })
        }
      }

    })
  }

 updateUserAffiliation(userAffiliation: any){
    let id = userAffiliation.user_affiliation_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขสังกัดผู้ใช้งาน',
        name_input: 'สังกัดผู้ใช้งาน',
        name_value: userAffiliation.user_affiliation_name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.updateUserAffiliation(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserAffiliation();
              }
            }
          })
        }
      }

    })
  }

  removeUserAffiliation(id: number) {
    this.userService.removeUserAffiliation(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getUserAffiliation();
        }
      }
    })

  }
  getUserPosition() {
    this.userService.getUserPosition().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userPositionList = res.data
        }
      }
    })
  }

  onAddUserPosition(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มตำแหน่งผู้ใช้งาน',
        name_input: 'ตำแหน่งผู้ใช้งาน'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.createUserPosition(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserPosition()
              }
            }
          })
        }
      }

    })
  }

 updateUserPosition(userPosition: any){
    let id = userPosition.user_position_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขตำแหน่งผู้ใช้งาน',
        name_input: 'ตำแหน่งผู้ใช้งาน',
        name_value: userPosition.user_position_name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.updateUserPosition(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserPosition();
              }
            }
          })
        }
      }

    })
  }

  removeUserPosition(id: number) {
    this.userService.removeUserPosition(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getUserPosition();
        }
      }
    })
  }

  getUserRank() {
    this.userService.getUserRank().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userRankList = res.data
        }
      }
    })
  }

  onAddUserRank(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มระดับผู้ใช้งาน',
        name_input: 'ระดับผู้ใช้งาน'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.createUserRank(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserRank()
              }
            }
          })
        }
      }

    })
  }

 updateUserRank(userRank: any){
    let id = userRank.user_rank_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขระดับผู้ใช้งาน',
        name_input: 'ระดับผู้ใช้งาน',
        name_value: userRank.user_rank_name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.updateUserRank(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserRank();
              }
            }
          })
        }
      }

    })
  }

  removeUserRank(id: number) {
    this.userService.removeUserRank(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getUserRank();
        }
      }
    })
  }

  getUserType() {
    this.userService.getUserType().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userTypeList = res.data
        }
      }
    })
  }

  onAddUserType(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มประเภทบรรจุผู้ใช้งาน',
        name_input: 'ประเภทบรรจุผู้ใช้งาน'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.createUserType(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserType()
              }
            }
          })
        }
      }

    })
  }

 updateUserType(userType: any){
    let id = userType.user_type_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขประเภทบรรจุผู้ใช้งาน',
        name_input: 'ประเภทบรรจุผู้ใช้งาน',
        name_value: userType.user_type_name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.updateUserType(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserType();
              }
            }
          })
        }
      }

    })
  }

  removeUserType(id: number) {
    this.userService.removeUserType(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getUserType();
        }
      }
    })
  }

  getUserRole() {
    this.userService.getUserRole().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userRoleList = res.data
        }
      }
    })
  }

  onAddUserRole(){
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มบทบาทผู้ใช้งาน',
        name_input: 'บทบาทผู้ใช้งาน'
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.createUserRole(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserRole()
              }
            }
          })
        }
      }

    })
  }

 updateUserRole(userRole: any){
    let id = userRole.user_role_id
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขบทบาทผู้ใช้งาน',
        name_input: 'บทบาทผู้ใช้งาน',
        name_value: userRole.user_role_name
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data
          this.userService.updateUserRole(id, name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                console.log(response.msg);
                this.getUserRole();
              }
            }
          })
        }
      }

    })
  }

  removeUserRole(id: number) {
    this.userService.removeUserRole(id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          console.log(res.msg);
          this.getUserRole();
        } else if (res.status == 2) {
          console.log(res.msg);

        }
      }
    })
  }

}
