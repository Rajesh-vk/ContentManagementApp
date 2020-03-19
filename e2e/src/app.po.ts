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
}
