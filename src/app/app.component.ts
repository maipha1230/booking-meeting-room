import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-meeting-room';

  public page = ""

  ngOnInit(): void {
    this.page = window.location.pathname
    console.log(this.page);


  }

}
