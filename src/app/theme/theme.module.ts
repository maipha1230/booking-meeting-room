import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminBaseComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [ AdminBaseComponent],
})
export class ThemeModule {}
