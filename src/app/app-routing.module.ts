import { AdminGuard } from './services/admin.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminBaseComponent } from './theme/admin-base/admin-base.component';
import { LoginComponent } from './pages/login/login.component';
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
    path: "admin",
    component: AdminBaseComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: "",
        component: DashboardComponent
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
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AdminGuard
  ]
})
export class AppRoutingModule { }
