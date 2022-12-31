import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phone: string): string {

    let position = 3;

    let output = [phone.slice(0, position), "-", phone.slice(position)].join('');

    return output
  }

}
