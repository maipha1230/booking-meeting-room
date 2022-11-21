import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material/material.module';
import { MeetingRoomModalComponent } from './meeting-room-modal/meeting-room-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    MeetingRoomModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    FontAwesomeModule,
    MaterialModule

  ]
})
export class SharedModule { }
