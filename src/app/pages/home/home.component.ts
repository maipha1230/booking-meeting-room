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
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      events: [
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T02:00:00',
          end: '2022-12-06T23:00:00',
        },
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T02:00:00',
          end: '2022-12-06T23:00:00',
        },
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T02:00:00',
          end: '2022-12-06T23:00:00',
        },
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T02:00:00',
          end: '2022-12-06T23:00:00',
        },
        {
          title: 'ห้องประชุม 1',
          start: '2022-12-06T02:00:00',
          end: '2022-12-06T23:00:00',
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
    };
  }
}
