import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookingList(status: number): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/admin/getBookingList`, { status: status })
  }

  getBookingById(booking_id:number):Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getBookingById/${booking_id}`)
  }

  bookingPermission(booking_id: number, permit: number): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/bookingPermission/${booking_id}`, { permit: permit })
  }

  getEditBookingById(booking_id: number): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getEditBookingById/${booking_id}`)
  }
}
