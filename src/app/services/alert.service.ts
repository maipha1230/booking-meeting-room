import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  successAlert(msg: string) {
    Swal.fire({
      icon: 'success',
      title: 'สำเร็จ',
      text: msg,
      timer: 2000,
      showConfirmButton: false
    })
  }
}
