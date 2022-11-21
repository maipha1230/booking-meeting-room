import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeetingRoomComponent,
    DeviceComponent,
    UserComponent,
    AdminstratorComponent,
    BookingRoomComponent,
    OtherSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
