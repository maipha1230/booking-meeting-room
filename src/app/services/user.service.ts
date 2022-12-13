import { BookingFormModel } from './../model/bookingForm.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /////////////////////////////////// admin ////////////////////
  //create user
  createUser(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/admin/createUser`, data);
  }

  //get users
  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getUsers`);
  }

  //get user by id
  getUserById(user_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.api_url}/admin/getUserById/${user_id}`
    );
  }

  //update user
  updateUser(user_id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(
      `${environment.api_url}/admin/updateUser/${user_id}`,
      formData
    );
  }

  //remove user
  removeUser(user_id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.api_url}/admin/removeUser/${user_id}`
    );
  }

  //reset user password
  resetUserPassword(user_id: number, password: string): Observable<any> {
    return this.http.put<any>(
      `${environment.api_url}/admin/resetUserPassword/${user_id}`,
      { password: password }
    );
  }

  //create admin
  createAdmin(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/admin/createAdmin`,
      data
    );
  }

  //get admins
  getAdmins(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getAdmins`);
  }

  //get admin by id
  getAdminById(user_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.api_url}/admin/getAdminById/${user_id}`
    );
  }

  //update admin
  updateAdmin(user_id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(
      `${environment.api_url}/admin/updateAdmin/${user_id}`,
      formData
    );
  }

  //remove admin
  removeAdmin(user_id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.api_url}/admin/removeAdmin/${user_id}`
    );
  }

  //reset admin password
  resetAdminPassword(user_id: number, password: string): Observable<any> {
    return this.http.put<any>(
      `${environment.api_url}/admin/resetAdminPassword/${user_id}`,
      { password: password }
    );
  }

  //user role api
  createUserRole(name: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createUserRole`, {
      name: name,
    });
  }
  getUserRole(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserRole`);
  }
  updateUserRole(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserRole/${id}`, {
      name: name,
    });
  }
  removeUserRole(id: number): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/admin/removeUserRole/${id}`
    );
  }

  //user affiliation api
  createUserAffiliation(name: string): Observable<any> {
    return this.http.post(
      `${environment.api_url}/admin/createUserAffiliation`,
      { name: name }
    );
  }
  getUserAffiliation(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserAffiliation`);
  }
  updateUserAffiliation(id: number, name: string): Observable<any> {
    return this.http.put(
      `${environment.api_url}/admin/updateUserAffiliation/${id}`,
      { name: name }
    );
  }
  removeUserAffiliation(id: number): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/admin/removeUserAffiliation/${id}`
    );
  }

  //user position api
  createUserPosition(name: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createUserPosition`, {
      name: name,
    });
  }
  getUserPosition(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserPosition`);
  }
  updateUserPosition(id: number, name: string): Observable<any> {
    return this.http.put(
      `${environment.api_url}/admin/updateUserPosition/${id}`,
      { name: name }
    );
  }
  removeUserPosition(id: number): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/admin/removeUserPosition/${id}`
    );
  }

  //user rank api
  createUserRank(name: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createUserRank`, {
      name: name,
    });
  }
  getUserRank(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserRank`);
  }
  updateUserRank(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserRank/${id}`, {
      name: name,
    });
  }
  removeUserRank(id: number): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/admin/removeUserRank/${id}`
    );
  }

  //user type api
  createUserType(name: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createUserType`, {
      name: name,
    });
  }
  getUserType(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserType`);
  }
  updateUserType(id: number, name: string): Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateUserType/${id}`, {
      name: name,
    });
  }
  removeUserType(id: number): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/admin/removeUserType/${id}`
    );
  }

  //user status api
  createUserStatus(name: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createUserStatus`, {
      name: name,
    });
  }
  getUserStatus(): Observable<any> {
    return this.http.get(`${environment.api_url}/admin/getUserStatus`);
  }
  updateUserStatus(id: number, name: string): Observable<any> {
    return this.http.put(
      `${environment.api_url}/admin/updateUserStatus/${id}`,
      { name: name }
    );
  }
  removeUserStatus(id: number): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/admin/removeUserStatus/${id}`
    );
  }

    //create line notify
  createLineNotify(token: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createLineNotify`, { token: token })
  }

  //get line notify
  getLineNotify():Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getLineNotify`)
  }

  //update line notify
  updateLineNotify(line_notify_id: number, token: string):Observable<any> {
    return this.http.put(`${environment.api_url}/admin/updateLineNotify/${line_notify_id}`, { token: token })
  }

  //remove line notify
  removeLineNotify(line_notify_id: number):Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeLineNotify/${line_notify_id}`)
  }

  ////////////////////////////// users //////////////////////

  //get users login form
  getUserLoginForm(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getUserLoginForm`);
  }

  //user login
  userLogin(user_id: number, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users/userLogin`, {
      user_id: user_id,
      password: password,
    });
  }

  // get admin login form
  getAdminLoginForm(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getAdminLoginForm`);
  }

  //admin login
  adminLogin(user_id: number, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users/adminLogin`, {
      user_id: user_id,
      password: password,
    });
  }

  //get admin nav
  getAdminNav(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getAdminNav`)
  }

  //booking meeting room
  userSubmitBooking(data: BookingFormModel): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users/userSubmitBooking`,
    {
      room: data.room,
      title: data.title,
      purpose: data.purpose,
      quantity: data.quantity,
      device: data.device,
      date: data.date,
      time_start: data.time_start,
      time_end: data.time_end
    })
  }

  userEditBooking(booking_id: number, data: BookingFormModel): Observable<any> {
    return this.http.put(`${environment.api_url}/users/userEditBooking/${booking_id}`,
    {
      room: data.room,
      title: data.title,
      purpose: data.purpose,
      quantity: data.quantity,
      device: data.device,
      date: data.date,
      time_start: data.time_start,
      time_end: data.time_end
    })
  }

  //user booking list
  userBookingList(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/userBookingList`)
  }

  //get user booking by id
  getUserBookingById(booking_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getUserBookingById/${booking_id}`)
  }

  //user remove booking
  userRemoveBooking(booking_id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/users/userRemoveBooking/${booking_id}`)
  }

  //check user own booking
  checkUserOwnBooking(booking_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/checkUserOwnBooking/${booking_id}`)
  }

  //get Meeting room list
  getMeetingRoomList(): Observable<any> {
    return this.http.get(`${environment.api_url}/users/getMeetingRoomList`)
  }

  //get booking to calendar
  getBookingToCalendar(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getBookingToCalendar`)
  }


}
