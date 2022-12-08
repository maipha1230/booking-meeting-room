import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material/material.module';
import { MeetingRoomModalComponent } from './meeting-room-modal/meeting-room-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OtherSettingModalComponent } from './other-setting-modal/other-setting-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModalComponent } from './user-modal/user-modal.component';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { DeviceModalComponent } from './device-modal/device-modal.component';


@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    MeetingRoomModalComponent,
    OtherSettingModalComponent,
    UserModalComponent,
    AdminModalComponent,
    UserToolbarComponent,
    DeviceModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    FontAwesomeModule,
    MaterialModule,
    UserToolbarComponent

  ]
})
export class SharedModule { }
