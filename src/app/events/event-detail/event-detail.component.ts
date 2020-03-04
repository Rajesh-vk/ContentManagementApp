import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Subject } from 'rxjs';
import { EventSummary, EventResolved } from 'src/app/Model/eventSummay';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  pageTitle = 'Event Detail';
  event: EventSummary;
  errorMessage: string;

  get userRole(): string {
    if (this.authService.loggedUserRole) {
      console.log(this.authService.loggedUserRole);
      return this.authService.loggedUserRole ;
    }
    return '';
  }

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: EventResolved = this.route.snapshot.data.resolvedData;
    this.errorMessage = resolvedData.error;
    this.onEventRetrieved(resolvedData.eventSummary);
  }

  onEventRetrieved(event: EventSummary): void {
    this.event = event;

    if (this.event) {
      this.pageTitle = `Event Detail: ${this.event.eventName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
