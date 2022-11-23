import { OtherSettingComponent } from './other-setting.component';
import { MeetingRoomSettingComponent } from './meeting-room-setting/meeting-room-setting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserSettingComponent } from './user-setting/user-setting.component';;

@NgModule({
  declarations: [
    MeetingRoomSettingComponent,
    OtherSettingComponent,
    UserSettingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
  ]
})
export class OtherSettingModule { }
