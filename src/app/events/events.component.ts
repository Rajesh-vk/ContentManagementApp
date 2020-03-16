import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, EMPTY } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HomeService } from '../home/home.service';
import { EventSummary } from '../Model/eventSummay';
import { EventService } from './event.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  pageTitle = 'Events';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  public eventDetails: any[];
  eventSummary$ = this.eventService.eventsSummary$
  .pipe(
    tap(data => {
      this.eventDetails = new Array<EventSummary>();
      this.eventDetails = data;
    }),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
constructor(private eventService: EventService, private router: Router) { }
  ngOnInit() {
  }

  getSelectedValue(row){
    this.router.navigate(['/event', row.id]);
  }

}
