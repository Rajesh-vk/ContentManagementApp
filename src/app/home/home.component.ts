import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Subject, EMPTY } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { EventService } from '../events/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'DashBoard';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  totalEvents = 0;
  liveImpacted = 0;
  totalVolunteers = 0;
  totalVolunteersHours = 0;
  eventSummary$ = this.homeService.eventsSummary$
    .pipe(
      tap(data => {
        this.liveImpacted = data.map(a => a.livesImpacted).reduce((a, b) => a + b);
        this.totalVolunteers = data.map(a => a.totalNoVolunteers).reduce((a, b) => a + b);
        this.totalVolunteersHours = data.map(a => a.totalVolunteHours).reduce((a, b) => a + b);
        this.totalEvents = data.length;
      }),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );
constructor(private homeService: EventService) { }

ngOnInit() {
  }

}
