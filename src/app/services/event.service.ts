import { Injectable, Pipe } from '@angular/core';
import { Observable, Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private sideBar = new Subject<any>();
  private userSideBar = new Subject<any>();
  private adminNav = new Subject<any>();
  constructor() { }

  setSideBar(){
    this.sideBar.next(true)
  }

  getSideBar(): Observable<any>{
    return this.sideBar.asObservable();
  }
  userSetSideBar(){
    this.userSideBar.next(true)
  }

  userGetSideBar(): Observable<any>{
    return this.userSideBar.asObservable();
  }

  setAdminNav() {
    this.adminNav.next(true)
  }

  getAdminNav(): Observable<any>{
    return this.adminNav.asObservable();
  }
}
