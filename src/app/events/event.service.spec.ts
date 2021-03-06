import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { EventService } from './event.service';
import { environment } from 'src/environments/environment';
import { EventSummary } from '../Model/eventSummay';


describe('EventService', () => {
    let httpTestingController: HttpTestingController;
    let service: EventService;
    let eventsSummaryUrl;
    let eventData;
    // let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EventService]
    });
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EventService);
    eventsSummaryUrl = environment.baseApiUrl + environment.eventApiUrl;
    eventData = {
        id: '1',
        baseLocation: 'sa',
        beneficiaryName: 'sdada',
        venueAddress: 'fyuuy',
        eventName: 'event1',
        eventDescription: 'asdsadsa',
        totalNoVolunteers: 56,
        totalVolunteHours: 777,
        totalTravelHours: 100,
        livesImpacted: 1000
    };
  });

    it('should Event service be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call the getEvent method and reurn a expected Event ', () => {
            service.getEvent('1').subscribe();
            const url = `${eventsSummaryUrl}/${1}`;
            const req =   httpTestingController.expectOne(url);
            req.flush(eventData);
            httpTestingController.verify();
    });

    it('should call the deleteEventSummary method. ', () => {
        service.deleteEventSummary('1').subscribe();
        const url = `${eventsSummaryUrl}/${1}`;
        const req =   httpTestingController.expectOne(url);
        req.flush({});
        httpTestingController.verify();
    });

    it('should call the createEventSummary method and reurn a created event ', () => {
        service.createEventSummary(eventData).subscribe();
        const url = `${eventsSummaryUrl}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(eventData);
        httpTestingController.verify();
    });

    it('should call the updateEventSummary method and reurn a updated event ', () => {
        service.updateEventSummary(eventData).subscribe();
        const url = `${eventsSummaryUrl}/${1}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(eventData);
        httpTestingController.verify();
    });

    it('should get the event list from eventsummary stream', () => {
        const expectedEvent: EventSummary[] =
        [{
            id: '1',
            baseLocation: 'sa',
            beneficiaryName: 'sdada',
            venueAddress: 'fyuuy',
            eventName: 'event1',
            eventDescription: 'asdsadsa',
            totalNoVolunteers: 56,
            totalVolunteHours: 777,
            totalTravelHours: 100,
            livesImpacted: 1000
        }, {
            id: '2',
            baseLocation: 'sa',
            beneficiaryName: 'sdada',
            venueAddress: 'fyuuy',
            eventName: 'event1',
            eventDescription: 'asdsadsa',
            totalNoVolunteers: 56,
            totalVolunteHours: 777,
            totalTravelHours: 100,
            livesImpacted: 1000
        }];
        // httpClientSpy.get.and.returnValue(expectedEvent);

        let data: any[];
        service.eventsSummary$.subscribe(
            d => data = d,
        );
        const url = `${eventsSummaryUrl}`;
        const req =   httpTestingController.expectOne(url);
        req.flush(expectedEvent);
        httpTestingController.verify();

        expect(data.length).toBe(2);

    });
});
