import { browser, by, element } from 'protractor';
import { Input } from '@angular/core';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h5')).getText() as Promise<string>;
  }

  getUserName() {
    return element(by.id('userNameId'));
  }

  getPassword() {
    return element(by.id('passwordId'));
  }

  getLoginButton() {
    return element(by.buttonText('Log In'));
  }

  getCardTitleText() {
    return element(by.className('card-title')).getText() as Promise<string>;
  }

  getAddEventRouterLink() {
    return element(by. className('nav-link add'));
  }

  getVolunteersRouterLink() {
    return element(by.className('volunteers'));
  }


  geteventNameId() {
    return element(by.id('eventNameId'));
  }

  geteventDescriptionId() {
    return element(by.id('eventDescriptionId'));
  }

  getbaseLocationId() {
    return element(by.id('baseLocationId'));
  }

  getbeneficiaryNameId() {
    return element(by.id('beneficiaryNameId'));
  }

  getvenueAddressId() {
    return element(by.id('venueAddressId'));
  }

  gettotalNoVolunteersId() {
    return element(by.id('totalNoVolunteersId'));
  }

  gettotalVolunteHoursId() {
    return element(by.id('totalVolunteHoursId'));
  }

  gettotalTravelHoursId() {
    return element(by.id('totalTravelHoursId'));
  }

  getlivesImpactedId() {
    return element(by.id('livesImpactedId'));
  }

  AddEvent() {
    return element(by.buttonText('Save'));
  }

  EditEvent() {
    return element(by.buttonText('Edit'));
  }

  getSelectedEvent() {
    return element(by.className('btn-renew'));
  }

}
