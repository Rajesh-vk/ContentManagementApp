import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventSummary, EventResolved } from 'src/app/Model/eventSummay';
import { EventService } from '../event.service';
import { Subject, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  pageTitle = 'Event Edit';
  errorMessage: string;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalEvent) !== JSON.stringify(this.currentEvent);
  }

  private currentEvent: EventSummary;
  private originalEvent: EventSummary;

  get event(): EventSummary {
    return this.currentEvent;
  }
  set event(value: EventSummary) {
    this.currentEvent = value;
    // Clone the object to retain a copy
    this.originalEvent = value ? { ...value } : null;
  }

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: EventResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onEventRetrieved(resolvedData.eventSummary);
    });
  }

  onEventRetrieved(event: EventSummary): void {
    this.event = event;
    if (!this.event) {
      this.pageTitle = 'No event found';
    } else {
      if (this.event.id === '0') {
        this.pageTitle = 'Add event';
      } else {
        this.pageTitle = `Edit event: ${this.event.eventName}`;
      }
    }
  }

  deleteEvent(): void {
    if (this.event.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the event: ${this.event.eventName}?`)) {
        this.eventService.deleteEventSummary(this.event.id).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      console.log(this.dataIsValid[path]);
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentEvent = null;
    this.originalEvent = null;
  }

  saveEvent(): void {
    if (this.isValid()) {
      if (this.event.id === '0') {
        this.eventService.createEventSummary(this.event).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.eventService.updateEventSummary(this.event).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    this.reset();
    this.router.navigate(['/event']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};


    if (this.event.eventName &&
      this.event.eventName.length >= 3 &&
      this.event.eventDescription && this.event.baseLocation
      && this.event.beneficiaryName && this.event.venueAddress) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    if (this.event.totalNoVolunteers && this.event.totalVolunteHours
      && this.event.totalTravelHours && this.event.livesImpacted) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
