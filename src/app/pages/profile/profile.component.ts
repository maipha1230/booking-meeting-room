import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { UploadImageComponent } from './../../shared/upload-image/upload-image.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public formProfile: FormGroup;
  public formPassword: FormGroup;
  public image_profile: string = ""

  public affiliations: any[] = []
  public positions:any[] = []
  public ranks:any[] = []
  public types:any[] = []
  constructor(private formBuiler: FormBuilder, private dialog: MatDialog, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.userGetUserAffiliation();
    this.userGetUserPosition();
    this.userGetUserRank();
    this.userGetUserType();
    this.createFormProfile();
    this.createFormPassword();
    this.getUserDetail();

  }

  createFormProfile(){
    this.formProfile = this.formBuiler.group({
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      phone: [""],
      email: [""],
      affiliation: [null, Validators.required],
      position: [null, Validators.required],
      rank: [null, Validators.required],
      type: [null, Validators.required],
    })

  }

  pathFormProfile(user: any){
    this.formProfile.patchValue({
      f_name: user.f_name,
      l_name: user.l_name,
      phone: user.phone,
      email: user.email,
      affiliation: user.affiliation,
      position: user.position,
      rank: user.rank,
      type: user.type
    })
    this.image_profile = user.picture_url
  }

  createFormPassword(){
    this.formPassword = this.formBuiler.group({
      old: ["", Validators.required],
      new: ["", Validators.required],
      new2: ["", Validators.required]
    })
  }

  getUserDetail(){
    this.userService.getUserDetail().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.pathFormProfile(res.data)
        }
      }
    })
  }

  userGetUserAffiliation(){
    this.userService.userGetUserAffiliation().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.affiliations = res.data
        }
      }
    })
  }
  userGetUserPosition(){
    this.userService.userGetUserPosition().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.positions = res.data
        }
      }
    })
  }
  userGetUserRank(){
    this.userService.userGetUserRank().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.ranks = res.data
        }
      }
    })
  }
  userGetUserType(){
    this.userService.userGetUserType().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.types = res.data
        }
      }
    })
  }


  onUploadImageClick(){
    let dialogRef = this.dialog.open(UploadImageComponent, {
      width: '70%',
      minWidth: '400px',
      height: 'auto',
    })

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        if (response.img) {
          let img = response.img
          let formData = new FormData()
          formData.append('gallery', img)
          this.userService.uploadImageProfile(formData).subscribe((res: any) => {
            if (res) {
              if (res.status == 1) {
                this.alertService.successAlert(res.msg)
                this.getUserDetail();
              }
            }
          })
        }
      }
    })
  }

  onUpdateProfileClick(){

    let user = {
      f_name: this.formProfile.controls['f_name'].value,
      l_name: this.formProfile.controls['l_name'].value,
      phone: this.formProfile.controls['phone'].value,
      email: this.formProfile.controls['email'].value,
      affiliation: this.formProfile.controls['affiliation'].value,
      position: this.formProfile.controls['position'].value,
      rank: this.formProfile.controls['rank'].value,
      type: this.formProfile.controls['type'].value,
    }

    this.userService.userUpdateUser(user).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.alertService.successAlert(res.msg)
          this.createFormProfile();
          this.getUserDetail();
        }
      }
    })

  }

}
