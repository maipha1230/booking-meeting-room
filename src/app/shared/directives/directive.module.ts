import { PhoneNumberDirective } from './phone-number.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
  imports: [
      CommonModule,

  ],
  declarations: [
    OnlyNumberDirective,
    PhoneNumberDirective
  ],
  exports: [
    OnlyNumberDirective,
    PhoneNumberDirective
  ]
})
export class DerectiveModule { }
