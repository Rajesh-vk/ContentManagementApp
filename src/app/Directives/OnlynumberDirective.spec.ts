import { Component, ElementRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OnlynumberDirective } from './OnlyNumberDer';

@Component({
    template: `<div><input class="form-control" id="totalNoVolunteersId" type="text" numbersOnly name="totalNoVolunteers" /></div>`
  })
  class TestOnlyNumberComponent {
    constructor(private el: ElementRef) {
      console.log('in constructor');
    }
  }

describe('OnlyNumberDerictive', () => {
    let component: TestOnlyNumberComponent;
    let fixture: ComponentFixture<TestOnlyNumberComponent>;
    let inputEl: HTMLElement;
    let elementRef: ElementRef;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestOnlyNumberComponent, OnlynumberDirective]
          });
        fixture = TestBed.createComponent(TestOnlyNumberComponent);
        component = fixture.componentInstance;
        elementRef = fixture.nativeElement;
        inputEl = fixture.nativeElement.querySelector('input');
    });

    it('should create an instance', () => {
        const directive = new OnlynumberDirective(elementRef);
        expect(directive).toBeTruthy();
      });

    // it('Focus over elements', () => {
    //     fixture.detectChanges();
    //     // const directive = new OnlynumberDirective(elementRef);
    //     const event = new Event('onInputChange', { bubbles: true });
    //     // const inputEle = fixture.debugElement.query(By.css('input'));
    //     inputEl.innerText = '1111';
    //     spyOn(event, 'stopPropagation');
    //     inputEl.dispatchEvent(event);
    //     fixture.detectChanges();
    //     expect(event.stopPropagation).toHaveBeenCalled();
    //   });

  });

