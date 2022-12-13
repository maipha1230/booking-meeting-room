import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookingList(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getBookingList`)
  }
}
