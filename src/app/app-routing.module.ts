import { HistoryComponent } from './pages/history/history.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { UserGuard } from './services/user.guard';
import { BookingComponent } from './pages/booking/booking.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { UserBaseComponent } from './theme/user-base/user-base.component';
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
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [


  {
    path: "",
    component: UserBaseComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "meeting-room",
        canActivate: [UserGuard],
        component: RoomListComponent
      },
      {
        path: "booking-meeting-room",
        canActivate: [UserGuard],
        component: BookingComponent
      },
      {
        path: "booking-meeting-room/:booking_id",
        canActivate: [UserGuard],
        component: BookingComponent
      },
      {
        path: "booking-list",
        canActivate: [UserGuard],
        component: BookingListComponent
      },
      {
        path: "profile",
        canActivate: [UserGuard],
        component: ProfileComponent
      },
    ]
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
        path: "booking-room/:booking_id",
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
        path: 'history',
        component: HistoryComponent
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
    AdminGuard,
    UserGuard
  ]
})
export class AppRoutingModule { }
