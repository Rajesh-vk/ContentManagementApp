import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { EventService } from '../events/event.service';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Input, Directive } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host : {'(Click)': 'onClick()'}

})
export class RouterLinkDirectiveStub {
@Input('routerLink') linkParams: any;
navigateTo: any;

onClick() {

  this.navigateTo = this.linkParams;
}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockService;
  let eventData;
  beforeEach(async(() => {
    mockService = jasmine.createSpyObj(['eventsSummary$']);
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, RouterLinkDirectiveStub ],
      providers: [{provide: EventService, useValue: mockService }]
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
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the Page Tittle as DashBoard', () => {
    const inputEle = fixture.debugElement.query(By.css('h6')).nativeElement;
    fixture.detectChanges();
    expect(inputEle.textContent).toContain('DashBoard');
 });

  it('Should read the Total Events span tag value correctly', () => {
    const inputEle = fixture.debugElement.query(By.css('span')).nativeElement;
    fixture.detectChanges();
    expect(inputEle.textContent).toContain('2');
 });

  it('Should read the Live Impact span tag value correctly', () => {
    const inputEle = fixture.debugElement.queryAll(By.css('span'));
    fixture.detectChanges();
    expect(inputEle[1].nativeElement.textContent).toContain('2000');
 });

  it('Should read the volunteers span tag value correctly', () => {
    const inputEle = fixture.debugElement.queryAll(By.css('span'));
    fixture.detectChanges();
    expect(inputEle[2].nativeElement.textContent).toContain('112');
 });

  it('Should read the volunteerHours span tag value correctly', () => {
    const inputEle = fixture.debugElement.queryAll(By.css('span'));
    fixture.detectChanges();
    expect(inputEle[3].nativeElement.textContent).toContain('1554');
 });

  it('Should set the routerLink  path correctly', () => {
  fixture.detectChanges();
  const routerLink = fixture.debugElement
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

  fixture.debugElement.query(By.css('a')).triggerEventHandler('Click', null);

  expect(routerLink.navigateTo).toEqual(['/event']);

});

});
