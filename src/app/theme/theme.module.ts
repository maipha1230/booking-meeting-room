import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { SharedModule } from '../shared/shared.module';
import { UserBaseComponent } from './user-base/user-base.component';

@NgModule({
  declarations: [
    AdminBaseComponent,
    UserBaseComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [ AdminBaseComponent],
})
export class ThemeModule {}
