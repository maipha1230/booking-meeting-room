import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  calendarOptions: CalendarOptions;

  events:any [] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getBookingToCalendar();
  }

  getBookingToCalendar(){
    this.userService.getBookingToCalendar().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.events = res.data
          this.initCalendar();
        }
      }
    })
  }

  initCalendar(){
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      },
      initialView: 'dayGridMonth',
      events: this.events,
      locale: 'th',
      firstDay: 1,
      slotMinTime: "06:00",
      slotMaxTime: "20:00",
      dayMaxEvents: true,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false,
      },
      displayEventEnd: true,
      buttonText: {
        prev: '< ก่อนหน้า',
        next: 'ข้างหน้า >',
        today: 'วันนี้',
        month: 'เดือน',
        week: 'สัปดาห์',

      },
      eventOverlap: true,
      aspectRatio: 1.75,
      contentHeight: 540,
      dateClick: this.onDateClick.bind(this)

    };
  }

  onDateClick(date: any){

  }
}
