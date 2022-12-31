import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[phoneNumber]'
})
export class PhoneNumberDirective {

  constructor() { }

  @HostListener('keypress', ['$event']) onInputChange(e: any) {

    var verified = String.fromCharCode(e.which).match(/[^0-9]/g);
    if (verified) {
      e.preventDefault();
      return false;
    }


  }
}
