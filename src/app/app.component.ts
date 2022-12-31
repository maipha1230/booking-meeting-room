import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-meeting-room';

  constructor(private dateAdapter: DateAdapter<any>){
  }
  ngOnInit(): void {
    this.dateAdapter.setLocale('th-TH');
  }

}
