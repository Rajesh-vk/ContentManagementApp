import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { EventService } from './event.service';
import { environment } from 'src/environments/environment';

describe('EventService', () => {
    let httpTestingController: HttpTestingController;
    let service: EventService;
    let eventsSummaryUrl;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EventService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EventService);
    eventsSummaryUrl = environment.baseApiUrl + environment.eventApiUrl;
  });

    it('should Event service be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call the getEvent method and reurn a expected Event ', () => {
            service.getEvent('1').subscribe();
            const url = `${eventsSummaryUrl}/${1}`;
            const req =   httpTestingController.expectOne(url);
            req.flush({
                id: '1',
                baseLocation: 'sa',
                beneficiaryName: 'sdada',
                venueAddress: 'fyuuy',
                eventName: 'event1',
                eventDescription: 'asdsadsa',
                totalNoVolunteers: 56,
                totalVolunteHours: 777,
                totalTravelHours: 100,
                livesImpacted: 1000,
        });
            httpTestingController.verify();
    });
});
