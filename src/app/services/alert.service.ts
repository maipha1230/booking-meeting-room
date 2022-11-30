import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  successAlert(msg: string) {
    Swal.fire({
      icon: 'success',
      title: msg,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  warningAlert(msg: string) {
    Swal.fire({
      icon: 'warning',
      title: msg,
      showConfirmButton: true,
      confirmButtonText: "ตกลง"
    })
  }

  ensureDeleteAlert(msg: string) {
    return new Observable<any>((observer) => {
      Swal.fire({
        icon: 'question',
        title: msg,
        showCancelButton: true,
        cancelButtonText: 'ไม่',
        cancelButtonColor: 'rgb(239, 68, 68)',
        showConfirmButton: true,
        confirmButtonText: 'ใช่',
      }).then((result) => {
        if (result) {
          if (result.isConfirmed) {
            if (result.isConfirmed === true) {
              observer.next(result.isConfirmed)
            } else {
              observer.next(result.isConfirmed)
            }
          }
        }
      })
    });
  }
  ensureResetPasswordAlert(msg: string) {
    return new Observable<any>((observer) => {
      Swal.fire({
        icon: 'question',
        title: msg,
        showCancelButton: true,
        cancelButtonText: 'ไม่',
        cancelButtonColor: 'rgb(239, 68, 68)',
        showConfirmButton: true,
        confirmButtonText: 'ใช่',
      }).then((result) => {
        if (result) {
          if (result.isConfirmed) {
            if (result.isConfirmed === true) {
              observer.next(result.isConfirmed)
            } else {
              observer.next(result.isConfirmed)
            }
          }
        }
      })
    });
  }
}
