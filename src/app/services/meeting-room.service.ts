import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {

  constructor(private http: HttpClient) { }

  ////////////////// admin //////////////////////////////////////////////

  createMeetingRoom(formData: FormData): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createMeetingRoom`, formData)
  }

  getMeetingRoom():Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getMeetingRoom`)
  }

  getMeetingRoomById(room_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getMeetingRoomById/${room_id}`)
  }

  updateMeetingRoom(room_id: number, formData: FormData) :Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/updateMeetingRoom/${room_id}`, formData)
  }

  removeMeetingRoom(room_id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeMeetingRoom/${room_id}`)
  }

  removeMeetingRoomImage(image_name: string): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/removeMeetingRoomImage`, { image_name: image_name })
  }

  getMeetingRoomSize(): Observable<any>{
    return this.http.get<any>(`${environment.api_url}/admin/getMeetingRoomSize`)
  }

  createMeetingRoomSize(name: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/admin/createMeetingRoomSize`,
    { name: name })
  }

  updateMeetingRoomSize(id: number, name: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/updateMeetingRoomSize/${id}`, { name: name })
  }

  removeMeetingRoomSize(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeMeetingRoomSize/${id}`)
  }
  getMeetingRoomStatus(): Observable<any>{
    return this.http.get<any>(`${environment.api_url}/admin/getMeetingRoomStatus`)
  }

  createMeetingRoomStatus(name: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/admin/createMeetingRoomStatus`,
    { name: name })
  }

  updateMeetingRoomStatus(id: number, name: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/updateMeetingRoomStatus/${id}`, { name: name })
  }

  removeMeetingRoomStatus(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeMeetingRoomStatus/${id}`)
  }

  createMeetingRoomDevice(data: any): Observable<any> {
    return this.http.post(`${environment.api_url}/admin/createMeetingRoomDevice`, data)
  }

  getMeetingRoomDevice(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getMeetingRoomDevice`)
  }

  getMeetingRoomDeviceById(room_device_id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/admin/getMeetingRoomDeviceById/${room_device_id}`)
  }

  updateMeetingRoomDevice(room_device_id:number,  data: any): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/admin/updateMeetingRoomDevice/${room_device_id}`, data)
  }

  removeMeetingRoomDevice(room_device_id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/admin/removeMeetingRoomDevice/${room_device_id}`)
  }

  ///////////////////////////// users /////////////////////////

  getRoomList(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getRoomList`)
  }

  getBookingPurposeList(): Observable<any>{
    return this.http.get<any>(`${environment.api_url}/users/getBookingPurposeList`)
  }

  getRoomDeviceList(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/getRoomDeviceList`)
  }


}
