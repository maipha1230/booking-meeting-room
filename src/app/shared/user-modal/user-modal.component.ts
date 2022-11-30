import { base64ToFile } from 'ngx-image-cropper';
import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  public formUser: FormGroup;

  public userAffiliationList: any = [];
  public userPositionList: any = [];
  public userRankList: any = [];
  public userTypeList: any = [];
  public userStatusList: any = [];
  public image_profile: any = null;
  public image_upload_status: boolean = false;

  public default_password: string = "user1234"

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUserAffiliation();
    this.getUserPosition();
    this.getUserRank();
    this.getUserType();
    this.getUserStatus();
    this.createFormUser();
    if (this.data) {
      if (this.data.user_id) {
        this.getUserById(this.data.user_id);
      }
    }
  }

  createFormUser() {
    this.formUser = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      password: [this.default_password, Validators.required],
      phone: [''],
      email: [''],
      affiliation: [null, Validators.required],
      position: [null, Validators.required],
      rank: [null, Validators.required],
      type: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  pathFormUser(data: any) {
    this.formUser.patchValue({
      fname: data.f_name,
      lname: data.l_name,
      password: data.password,
      phone: data.phone,
      email: data.email,
      affiliation: data.affiliation_id,
      position: data.position_id,
      rank: data.rank_id,
      type: data.type_id,
      status: data.status_id,
    });
  }

  getUserById(user_id: number) {
    this.userService.getUserById(user_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.image_profile = res.data.picture_url;
          this.pathFormUser(res.data);
        }
      }
    });
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

  getUserPosition() {
    this.userService.getUserPosition().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userPositionList = res.data;
        }
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

  getUserType() {
    this.userService.getUserType().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.userTypeList = res.data;
        }
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

  onSaveUser() {
    if (!this.image_profile) {
      this.alertService.warningAlert("กรุณาอัพโหลดรูปภาพ")
    } else {
      const data = this.prepareForm();

      const formData = new FormData();

      formData.append('f_name', data.f_name);
      formData.append('l_name', data.l_name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('affiliation', data.affiliation);
      formData.append('position', data.position);
      formData.append('rank', data.rank);
      formData.append('type', data.type);
      formData.append('status', data.status);
      if (this.image_profile && this.image_upload_status) {
        formData.append('gallery', base64ToFile(this.image_profile));
      }

      if (this.data) {
        this.userService
          .updateUser(this.data.user_id, formData)
          .subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg);
                this.dialogRef.close(true);
              }
            }
          });
      } else {
        this.userService.createUser(formData).subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.alertService.successAlert(res.msg);
              this.dialogRef.close(true);
            }
          }
        });
      }
    }
  }

  prepareForm(): any {
    const data = {
      f_name: this.formUser.controls['fname'].value,
      l_name: this.formUser.controls['lname'].value,
      password: this.formUser.controls['password'].value,
      phone: this.formUser.controls['phone'].value,
      email: this.formUser.controls['email'].value,
      affiliation: this.formUser.controls['affiliation'].value,
      position: this.formUser.controls['position'].value,
      rank: this.formUser.controls['rank'].value,
      type: this.formUser.controls['type'].value,
      status: this.formUser.controls['status'].value,
    };

    return data;
  }

  fileChangeEvent(event: any) {
    let file: File = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.image_profile = event.target?.result;
        this.image_upload_status = true;
      };
    }
  }

  public toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  onResetPassword(){
    if (this.data) {
      this.alertService.ensureResetPasswordAlert("ต้องการรีเซ็ทรหัสผ่านผู้ใช้งานนี้ใช่หรือไม่").subscribe((result) => {
        if (result) {
          const password = this.default_password
          this.userService.resetUserPassword(this.data.user_id, password).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg)
              }
            }
          })
        }
      })
    }

  }
}
