import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  //user role api
  createUserRole(name: string): Observable<any>{
    return this.http.post(`${environment.api_url}/admin/createUserRole`, { name: name })
  }
  getUserRole(): Observable<any>{
    return this.http.get(`${environment.api_url}/admin/getUserRole`)
  }
  updateUserRole(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserRole/${id}`, { name: name })
  }
  removeUserRole(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeUserRole/${id}`)
  }

  //user affiliation api
  createUserAffiliation(name: string): Observable<any>{
    return this.http.post(`${environment.api_url}/admin/createUserAffiliation`, { name: name })
  }
  getUserAffiliation(): Observable<any>{
    return this.http.get(`${environment.api_url}/admin/getUserAffiliation`)
  }
  updateUserAffiliation(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserAffiliation/${id}`, { name: name })
  }
  removeUserAffiliation(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeUserAffiliation/${id}`)
  }

  //user position api
  createUserPosition(name: string): Observable<any>{
    return this.http.post(`${environment.api_url}/admin/createUserPosition`, { name: name })
  }
  getUserPosition(): Observable<any>{
    return this.http.get(`${environment.api_url}/admin/getUserPosition`)
  }
  updateUserPosition(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserPosition/${id}`, { name: name })
  }
  removeUserPosition(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeUserPosition/${id}`)
  }

  //user rank api
  createUserRank(name: string): Observable<any>{
    return this.http.post(`${environment.api_url}/admin/createUserRank`, { name: name })
  }
  getUserRank(): Observable<any>{
    return this.http.get(`${environment.api_url}/admin/getUserRank`)
  }
  updateUserRank(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserRank/${id}`, { name: name })
  }
  removeUserRank(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeUserRank/${id}`)
  }

  //user type api
  createUserType(name: string): Observable<any>{
    return this.http.post(`${environment.api_url}/admin/createUserType`, { name: name })
  }
  getUserType(): Observable<any>{
    return this.http.get(`${environment.api_url}/admin/getUserType`)
  }
  updateUserType(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserType/${id}`, { name: name })
  }
  removeUserType(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeUserType/${id}`)
  }

}
