import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, combineLatest, EMPTY, from, merge, Subject, throwError, of, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap } from 'rxjs/operators';
import { EventSummary } from '../Model/eventSummay';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private userUrl = environment.baseApiUrl + environment.userApiUrl;
  constructor(private httpUrl: HttpClient) { }
  getEvent(id: string): Observable<EventSummary> {
    const url = `${this.userUrl}/${id}`;
    return this.httpUrl.get<EventSummary>(url)
      .pipe(
        tap(data => console.log('getEvent: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createEventSummary(eventSummary: EventSummary): Observable<EventSummary> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const d: Date = new Date()
    eventSummary.id = 'Evnt2020' +  d.getTime().toString();
    return this.httpUrl.post<EventSummary>(this.userUrl, eventSummary, { headers })
      .pipe(
        tap(data => console.log('createEventSummary: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteEventSummary(id: string): Observable<{}> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    const url = `${this.userUrl}/${id}`;
    return this.httpUrl.delete<EventSummary>(url)
      .pipe(
        tap(data => console.log('deleteEventSummary: ' + id)),
        catchError(this.handleError)
      );
  }

  updateEventSummary(eventSummary: EventSummary): Observable<EventSummary> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userUrl}/${eventSummary.id}`;
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
