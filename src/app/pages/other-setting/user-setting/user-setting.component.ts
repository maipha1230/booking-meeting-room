import { AlertService } from './../../../services/alert.service';
import { OtherSettingModalComponent } from './../../../shared/other-setting-modal/other-setting-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss'],
})
export class UserSettingComponent implements OnInit {
  public userAffiliationList: any = [];
  public userPositionList: any = [];
  public userRankList: any = [];
  public userTypeList: any = [];
  public userRoleList: any = [];
  public userStatusList: any = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUserAffiliation();
    this.getUserPosition();
    this.getUserRank();
    this.getUserType();
    this.getUserRole();
    this.getUserStatus();
  }

  getUserAffiliation() {
    this.userService.getUserAffiliation().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userAffiliationList = res.data;
        }
      }
    });
  }

  onAddUserAffiliation() {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มแผนกผู้ใช้งาน',
        name_input: 'แผนกผู้ใช้งาน',
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .createUserAffiliation(name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserAffiliation();
                }
              }
            });
        }
      }
    });
  }

  updateUserAffiliation(userAffiliation: any) {
    let id = userAffiliation.user_affiliation_id;
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขแผนกผู้ใช้งาน',
        name_input: 'แผนกผู้ใช้งาน',
        name_value: userAffiliation.user_affiliation_name,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .updateUserAffiliation(id, name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserAffiliation();
                } else if (response.status == 2 ) {
                  this.alertService.warningAlert(response.msg)
                }
              }
            });
        }
      }
    });
  }

  removeUserAffiliation(id: number) {
    this.alertService
      .ensureDeleteAlert(
        'ต้องการลบแผนกนี้ใช่หรือไม่?'
      )
      .subscribe((result: any) => {
        if (result) {
          this.userService.removeUserAffiliation(id).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.getUserAffiliation();
              } else if (res.status == 2) {
                this.alertService.warningAlert(res.msg)
              }
            }
          });
        }
      });
  }
  getUserPosition() {
    this.userService.getUserPosition().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userPositionList = res.data;
        }
      }
    });
  }

  onAddUserPosition() {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มตำแหน่งผู้ใช้งาน',
        name_input: 'ตำแหน่งผู้ใช้งาน',
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .createUserPosition(name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserPosition();
                }
              }
            });
        }
      }
    });
  }

  updateUserPosition(userPosition: any) {
    let id = userPosition.user_position_id;
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขตำแหน่งผู้ใช้งาน',
        name_input: 'ตำแหน่งผู้ใช้งาน',
        name_value: userPosition.user_position_name,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .updateUserPosition(id, name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserPosition();
                }else if (response.status == 2 ) {
                  this.alertService.warningAlert(response.msg)
                }
              }
            });
        }
      }
    });
  }

  removeUserPosition(id: number) {
    this.alertService
      .ensureDeleteAlert(
        'ต้องการลบตำแหน่งนี้ใช่หรือไม่?'
      )
      .subscribe((result: any) => {
        if (result) {
          this.userService.removeUserPosition(id).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.getUserPosition();
              } else if (res.status == 2) {
                this.alertService.warningAlert(res.msg)
              }
            }
          });
        }
      });
  }

  getUserRank() {
    this.userService.getUserRank().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userRankList = res.data;
        }
      }
    });
  }

  onAddUserRank() {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มระดับผู้ใช้งาน',
        name_input: 'ระดับผู้ใช้งาน',
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService.createUserRank(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getUserRank();
              }
            }
          });
        }
      }
    });
  }

  updateUserRank(userRank: any) {
    let id = userRank.user_rank_id;
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขระดับผู้ใช้งาน',
        name_input: 'ระดับผู้ใช้งาน',
        name_value: userRank.user_rank_name,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .updateUserRank(id, name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserRank();
                }else if (response.status == 2 ) {
                  this.alertService.warningAlert(response.msg)
                }
              }
            });
        }
      }
    });
  }

  removeUserRank(id: number) {
    this.alertService
      .ensureDeleteAlert(
        'ต้องการลบระดับนี้ใช่หรือไม่?'
      )
      .subscribe((result: any) => {
        if (result) {
          this.userService.removeUserRank(id).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.getUserRank();
              } else if (res.status == 2) {
                this.alertService.warningAlert(res.msg)
              }
            }
          });
        }
      });
  }

  getUserType() {
    this.userService.getUserType().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userTypeList = res.data;
        }
      }
    });
  }

  onAddUserType() {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มประเภทบรรจุผู้ใช้งาน',
        name_input: 'ประเภทบรรจุผู้ใช้งาน',
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService.createUserType(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getUserType();
              }
            }
          });
        }
      }
    });
  }

  updateUserType(userType: any) {
    let id = userType.user_type_id;
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขประเภทบรรจุผู้ใช้งาน',
        name_input: 'ประเภทบรรจุผู้ใช้งาน',
        name_value: userType.user_type_name,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .updateUserType(id, name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserType();
                } else if (response.status == 2 ) {
                  this.alertService.warningAlert(response.msg)
                }
              }
            });
        }
      }
    });
  }

  removeUserType(id: number) {
    this.alertService
      .ensureDeleteAlert(
        'ต้องการลบประเภทบรรจุนี้ใช่หรือไม่?'
      )
      .subscribe((result: any) => {
        if (result) {
          this.userService.removeUserType(id).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.getUserType();
              } else if (res.status == 2) {
                this.alertService.warningAlert(res.msg)
              }
            }
          });
        }
      });
  }

  getUserRole() {
    this.userService.getUserRole().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userRoleList = res.data;
        }
      }
    });
  }

  onAddUserRole() {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มบทบาทผู้ใช้งาน',
        name_input: 'บทบาทผู้ใช้งาน',
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService.createUserRole(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getUserRole();
              }
            }
          });
        }
      }
    });
  }

  updateUserRole(userRole: any) {
    let id = userRole.user_role_id;
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขบทบาทผู้ใช้งาน',
        name_input: 'บทบาทผู้ใช้งาน',
        name_value: userRole.user_role_name,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .updateUserRole(id, name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserRole();
                }
              }
            });
        }
      }
    });
  }

  removeUserRole(id: number) {
    this.alertService
      .ensureDeleteAlert(
        'ต้องการลบใช่หรือไม่ หากคุณลบผู้ใช้งานที่อยู่ในบทบาทจะถูกลบไปด้วย'
      )
      .subscribe((result: any) => {
        if (result) {
          this.userService.removeUserRole(id).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.getUserRole();
              } else if (res.status == 2) {
                this.alertService.warningAlert(res.msg);
              }
            }
          });
        }
      });
  }
  getUserStatus() {
    this.userService.getUserStatus().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userStatusList = res.data;
        }
      }
    });
  }

  onAddUserStatus() {
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'เพิ่มสถานะผู้ใช้งาน',
        name_input: 'สถานะผู้ใช้งาน',
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService.createUserStatus(name).subscribe((response: any) => {
            if (response) {
              if (response.status == 1) {
                this.alertService.successAlert(response.msg)
                this.getUserStatus();
              }
            }
          });
        }
      }
    });
  }

  updateUserStatus(userStatus: any) {
    let id = userStatus.user_status_id;
    let dialogRef = this.dialog.open(OtherSettingModalComponent, {
      width: '50%',
      minWidth: '400px',
      height: 'auto',
      data: {
        title_modal: 'แก้ไขสถานะผู้ใช้งาน',
        name_input: 'สถานะผู้ใช้งาน',
        name_value: userStatus.user_status_name,
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        if (res.data) {
          let name = res.data;
          this.userService
            .updateUserStatus(id, name)
            .subscribe((response: any) => {
              if (response) {
                if (response.status == 1) {
                  this.alertService.successAlert(response.msg)
                  this.getUserStatus();
                }
              }
            });
        }
      }
    });
  }

  removeUserStatus(id: number) {
    this.alertService
      .ensureDeleteAlert(
        'ต้องการลบใช่หรือไม่ หากคุณลบผู้ใช้งานที่อยู่ในสถานะจะถูกลบไปด้วย'
      )
      .subscribe((result: any) => {
        if (result) {
          this.userService.removeUserStatus(id).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.getUserStatus();
              } else if (res.status == 2) {
                this.alertService.warningAlert(res.msg);
              }
            }
          });
        }
      });
  }
}
