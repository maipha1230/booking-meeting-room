import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-meeting-room';

  constructor(private authService: AuthService){

  }

  isAdminLoggedIn$: Observable<boolean>;
  ngOnInit(): void {

  }

}
