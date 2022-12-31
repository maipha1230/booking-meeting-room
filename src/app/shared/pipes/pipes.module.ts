import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThaiDatePipe } from './thaiDate.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThaiDatePipe,
        PhoneNumberPipe
    ],
    exports: [
        ThaiDatePipe,
        PhoneNumberPipe
    ]
})
export class PipesModule { }
