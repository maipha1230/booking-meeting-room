import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThaiDatePipe } from './thaiDate.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThaiDatePipe
    ],
    exports: [
        ThaiDatePipe
    ]
})
export class PipesModule { }
