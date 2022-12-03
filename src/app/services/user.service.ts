import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /////////////////////////////////// admin ////////////////////
  //create user
  createUser(data: any): Observable<any>{
    return this.http.post<any>(`${environment.api_url}/admin/createUser`, data)
  }

  //get users
  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getUsers`)
  }

  //get user by id
  getUserById(user_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getUserById/${user_id}`)
  }

  //update user
  updateUser(user_id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/updateUser/${user_id}`, formData)
  }

  //remove user
  removeUser(user_id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/admin/removeUser/${user_id}`)
  }

  //reset user password
  resetUserPassword(user_id: number, password: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/resetUserPassword/${user_id}`, { password: password })
  }

  //create admin
  createAdmin(data: any): Observable<any>{
    return this.http.post<any>(`${environment.api_url}/admin/createAdmin`, data)
  }

  //get admins
  getAdmins(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getAdmins`)
  }

  //get admin by id
  getAdminById(user_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getAdminById/${user_id}`)
  }

  //update admin
  updateAdmin(user_id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/updateAdmin/${user_id}`, formData)
  }

  //remove admin
  removeAdmin(user_id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/admin/removeAdmin/${user_id}`)
  }

  //reset admin password
  resetAdminPassword(user_id: number, password: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/resetAdminPassword/${user_id}`, { password: password })
  }

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

  //user status api
  createUserStatus(name: string): Observable<any>{
    return this.http.post(`${environment.api_url}/admin/createUserStatus`, { name: name })
  }
  getUserStatus(): Observable<any>{
    return this.http.get(`${environment.api_url}/admin/getUserStatus`)
  }
  updateUserStatus(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserStatus/${id}`, { name: name })
  }
  removeUserStatus(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeUserStatus/${id}`)
  }
  // get admin login form
  getAdminLoginForm(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getAdminLoginForm`)
  }

  //admin login
  adminLogin(user_id: number, password: string): Observable<any>{
    return this.http.post<any>(`${environment.api_url}/admin/adminLogin`, { user_id: user_id, password: password })
  }

  ////////////////////////////// users //////////////////////

  //get users login form
  getUserLoginForm(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getUserLoginForm`)
  }

  //user login
  userLogin(user_id: number, password: string): Observable<any>{
    return this.http.post<any>(`${environment.api_url}/users/userLogin`, { user_id: user_id, password: password })
  }

}
