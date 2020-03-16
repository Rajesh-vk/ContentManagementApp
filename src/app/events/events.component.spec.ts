import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService } from '../events/event.service';
import { of} from 'rxjs';
import { By } from '@angular/platform-browser';
import { EventsComponent } from './events.component';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridViewComponent } from '../shared/grid-view/grid-view.component';



describe('EventsComponent', () => {
    let component: EventsComponent;
    let fixture: ComponentFixture<EventsComponent>;
    let mockService;
    let eventData;
    let router: Router;
    beforeEach(async(() => {
      mockService = jasmine.createSpyObj(['eventsSummary$']);
      TestBed.configureTestingModule({
        imports: [
            SharedModule,
            RouterTestingModule.withRoutes([]),
            BrowserAnimationsModule,
        ],
        declarations: [
            EventsComponent,
         ],
        providers: [
            {provide: EventService, useValue: mockService },
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
    eventData = [{
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
    const spy = TestBed.get(EventService);
    spy.eventsSummary$ = of(eventData);
    router = TestBed.get(Router);

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('Should have the Page Tittle as Events', () => {
    const inputEle = fixture.debugElement.query(By.css('h6')).nativeElement;
    fixture.detectChanges();
    expect(inputEle.textContent).toContain('Events');
 });

    it('should load the child component with 2 row', () => {
        component.eventSummary$.subscribe();
        fixture.detectChanges();
        expect(component.eventDetails.length).toEqual(2);
  });

    it('Should set the router path correctly', () => {
        component.eventSummary$.subscribe();
        const navigateSpy = spyOn(router, 'navigate');
        fixture.detectChanges();
        const gridViewComponent = fixture.debugElement.queryAll(By.directive(GridViewComponent));
        gridViewComponent[0].query(By.css('button')).triggerEventHandler('valueSelected', {id: '1'});

        component.getSelectedValue({id: '1'});
        expect(navigateSpy).toHaveBeenCalledWith([ '/event', '1' ] );

 });

    it('Should render the child component with  correct data', () => {
    component.eventSummary$.subscribe();
    const navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    const gridViewComponent = fixture.debugElement.queryAll(By.directive(GridViewComponent));
    const button = gridViewComponent[0].queryAll(By.css('button'));
    expect(button.length).toEqual(10);

});
});
