import { LoadingInterceptor } from './services/loading.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PipesModule } from './shared/pipes/pipes.module';
import { ThemeModule } from './theme/theme.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MeetingRoomComponent } from './pages/meeting-room/meeting-room.component';
import { DeviceComponent } from './pages/device/device.component';
import { UserComponent } from './pages/user/user.component';
import { AdminstratorComponent } from './pages/adminstrator/adminstrator.component';
import { BookingRoomComponent } from './pages/booking-room/booking-room.component';
import { OtherSettingComponent } from './pages/other-setting/other-setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtherSettingModule } from './pages/other-setting/other-setting.module';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ThaiDatePipe } from './shared/pipes/thaiDate.pipe';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
])


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeetingRoomComponent,
    DeviceComponent,
    UserComponent,
    AdminstratorComponent,
    BookingRoomComponent,
    LoginComponent,
    DashboardComponent,
    RoomListComponent,
    BookingComponent,
    BookingListComponent,
    HistoryComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    OtherSettingModule,
    ReactiveFormsModule,
    ThemeModule,
    FullCalendarModule,
    FormsModule,
    NgxMatTimepickerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },,
    ThaiDatePipe,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
