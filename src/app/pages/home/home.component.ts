import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  calendarOptions: CalendarOptions;

  events = [];

  constructor() {}

  ngOnInit(): void {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      },
      initialView: 'dayGridMonth',
      events: [
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T09:00:00',
          end: '2022-12-06T15:00:00',
        },
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T09:00:00',
          end: '2022-12-06T10:00:00',
        },
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-07T09:00:00',
          end: '2022-12-07T10:00:00',
        },
      ],
      locale: 'th',
      firstDay: 1,
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
      aspectRatio: 1.75,
      contentHeight: 540,
      dateClick: this.onDateClick.bind(this)

    };
  }

  onDateClick(date: any){
    console.log(typeof(date));
    console.log(date.dateStr);

  }
}
