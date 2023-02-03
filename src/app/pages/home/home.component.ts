import { Router } from '@angular/router';
import { ThaiDatePipe } from './../../shared/pipes/thaiDate.pipe';
import { AlertService } from './../../services/alert.service';
import { DateEventComponent } from './../../shared/date-event/date-event.component';
import { MatDialog } from '@angular/material/dialog';
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

  events: any[] = [];

  constructor(
    private userService: UserService,
    private diaLog: MatDialog,
    private alertService: AlertService,
    private thaidatePipe: ThaiDatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBookingToCalendar();
  }

  getBookingToCalendar() {
    this.userService.getBookingToCalendar().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.events = res.data;
          this.initCalendar();
        }
      }
    });
  }

  initCalendar() {
    let innerHeight = window.innerHeight;
    this.calendarOptions = {
      headerToolbar: {
        left: 'title',
        right: 'today,prev,next dayGridMonth,timeGridWeek',
      },
      initialView: 'dayGridMonth',
      events: this.events,
      locale: 'th',
      firstDay: 1,
      slotMinTime: '06:00',
      slotMaxTime: '20:00',
      dayMaxEvents: true,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false,
      },
      displayEventEnd: true,
      buttonText: {
        prev: '<',
        next: '>',
        today: 'วันนี้',
        month: 'เดือน',
        week: 'สัปดาห์',
      },
      eventOverlap: true,
      eventDisplay: 'block',
      // contentHeight: 'auto',
      // height: 'auto',
      dateClick: this.onDateClick.bind(this),
    };
  }

  onDateClick(date: any) {
    // this.userService.eventDateCalendar(date.dateStr).subscribe((res: any) => {
    //   if (res) {
    //     if (res.status == 1) {
    //       this.diaLog.open(DateEventComponent, {
    //         width: '60%',
    //         minWidth: '400px',
    //         height: '90%',
    //         data: {
    //           booking: res.data
    //         }
    //       })
    //     }
    //   }
    // })
    let time = this.thaidatePipe.transform(date.dateStr, "medium")
    this.alertService.ensureAlert(`ต้องการจองห้องประชุมในวันที่ ${time} ใช่หรือไม่`).subscribe((confirm: any) => {
      if (confirm) {
        this.router.navigate(['/booking-meeting-room'], { queryParams: { date: String(date.dateStr) } })
      }
    })
  }
}
