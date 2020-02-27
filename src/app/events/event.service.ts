import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, combineLatest, EMPTY, from, merge, Subject, throwError, of, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap } from 'rxjs/operators';
import { EventSummary } from '../Model/eventSummay';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsSummaryUrl = environment.eventApiUrl;
  eventCount = 0;

  eventsSummary$ = this.httpUrl.get<EventSummary[]>(this.eventsSummaryUrl)
    .pipe(
      tap(data => {
        this.eventCount = data.length + 1;
      }),
      catchError(this.handleError),
      // shareReplay(1)
    );

  private eventSelectedSubject = new BehaviorSubject<string>('0');
  eventSelectedAction$ = this.eventSelectedSubject.asObservable();

  selectedEvent$ = combineLatest([
    this.eventsSummary$,
    this.eventSelectedAction$
  ]).pipe(
    map(([events, selectedEventId]) =>
    events.find(event => event.id === selectedEventId)
    ),

    shareReplay(1)
  );

  constructor(private httpUrl: HttpClient, ) { }

  selectedEventChanged(selectedEventId: string): void {
    this.eventSelectedSubject.next(selectedEventId);
  }

  getEvent(id: string): Observable<EventSummary> {
    if (id === '0') {
      return of(this.initializeEvent());
    }
    const url = `${this.eventsSummaryUrl}/${id}`;
    return this.httpUrl.get<EventSummary>(url)
      .pipe(
        tap(data => console.log('getEvent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private initializeEvent(): EventSummary {
    // Return an initialized object
    return {
            id: '0',
            baseLocation: null,
            beneficiaryName: null,
            venueAddress: null,
            eventName: null,
            eventDescription: null,
            totalNoVolunteers: null,
            totalVolunteHours: null,
            totalTravelHours: null,
            livesImpacted: null,
    };
  }

  createEventSummary(eventSummary: EventSummary): Observable<EventSummary> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const d: Date = new Date()
    eventSummary.id = 'Evnt2020' +  d.getTime().toString();
    return this.httpUrl.post<EventSummary>(this.eventsSummaryUrl, eventSummary, { headers })
      .pipe(
        tap(data => console.log('createEventSummary: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteEventSummary(id: string): Observable<{}> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(id);
    const url = `${this.eventsSummaryUrl}/${id}`;
    return this.httpUrl.delete<EventSummary>(url)
      .pipe(
        tap(data => console.log('deleteEventSummary: ' + id)),
        catchError(this.handleError)
      );
  }

  updateEventSummary(eventSummary: EventSummary): Observable<EventSummary> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.eventsSummaryUrl}/${eventSummary.id}`;
    return this.httpUrl.put<EventSummary>(url, eventSummary, { headers })
      .pipe(
        tap(() => console.log('updateEventSummary: ' + eventSummary.id)),
        // Return the EventSummary on an update
        map(() => eventSummary),
        catchError(this.handleError)
      );
  }


  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
