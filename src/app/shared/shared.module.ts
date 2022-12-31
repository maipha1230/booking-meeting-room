import { PipesModule } from './pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material/material.module';
import { MeetingRoomModalComponent } from './meeting-room-modal/meeting-room-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtherSettingModalComponent } from './other-setting-modal/other-setting-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { UserModalComponent } from './user-modal/user-modal.component';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { UserToolbarComponent } from './user-toolbar/user-toolbar.component';
import { DeviceModalComponent } from './device-modal/device-modal.component';
import { SwiperModule } from 'swiper/angular';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { EditBookingModalComponent } from './edit-booking-modal/edit-booking-modal.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { BookingDetailModalComponent } from './booking-detail-modal/booking-detail-modal.component';
import { HistoryTableComponent } from './history-table/history-table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DerectiveModule } from './directives/directive.module';

@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    MeetingRoomModalComponent,
    OtherSettingModalComponent,
    UserModalComponent,
    AdminModalComponent,
    UserToolbarComponent,
    DeviceModalComponent,
    BookingModalComponent,
    EditBookingModalComponent,
    UserSidebarComponent,
    BookingDetailModalComponent,
    HistoryTableComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    PipesModule,
    SwiperModule,
    FormsModule,
    ImageCropperModule,
    DerectiveModule
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    FontAwesomeModule,
    MaterialModule,
    UserToolbarComponent,
    PipesModule,
    SwiperModule,
    UserSidebarComponent,
    DerectiveModule

  ]
})
export class SharedModule { }
