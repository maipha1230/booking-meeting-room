import { OtherSettingComponent } from './pages/other-setting/other-setting.component';
import { BookingRoomComponent } from './pages/booking-room/booking-room.component';
import { AdminstratorComponent } from './pages/adminstrator/adminstrator.component';
import { UserComponent } from './pages/user/user.component';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './pages/device/device.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "booking-room",
    component: BookingRoomComponent
  },
  {
    path: 'meeting-room',
    component: MeetingRoomComponent
  },
  {
    path: 'device',
    component: DeviceComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'adminstrator',
    component: AdminstratorComponent
  },
  {
    path: 'other-setting',
    component: OtherSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
