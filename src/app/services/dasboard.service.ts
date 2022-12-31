import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DasboardService {

  constructor(private http: HttpClient) { }

  getBookingsOverview(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getBookingsOverview`)
  }

  getUserOverview(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserOverview`)
  }

  getAdminOverview(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getAdminOverview`)
  }

  getRoomTime(dateStart: any, dateEnd: any):Observable<any> {
    return this.http.post(`${environment.api_url}/admin/getRoomTime`, { dateStart: dateStart, dateEnd: dateEnd })
  }

  getAffiliationChart(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getAffiliationChart`)
  }
}
