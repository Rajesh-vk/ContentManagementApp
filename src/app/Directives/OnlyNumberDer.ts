import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]'
})
export class OnlynumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;

    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}