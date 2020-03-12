import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { EventService } from './event.service';

describe('EventService', () => {
    let httpTestingController: HttpTestingController;
    let service: EventService;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EventService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EventService);

  });

    it('should Event service be created', () => {
    expect(service).toBeTruthy();
  });
});
