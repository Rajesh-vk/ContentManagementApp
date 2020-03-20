import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  function loginClick() {
    page.getUserName().sendKeys('admin');
    page.getPassword().sendKeys('admin');
    const login = page.getLoginButton();
    login.click();

  }

  it('should display welcome message', () => {
    expect(page.getTitleText()).toEqual('OutReach FMS');
  });

  it('should login button has a disabled class', () => {
    page.getUserName().sendKeys('admin');
    // page.getPassword().sendKeys('admin');
    const login = page.getLoginButton();
    expect(login.getAttribute('disabled')).toBeTruthy();
  });

  it('should click login button and land the dashBoad page', () => {
    loginClick();
    browser.waitForAngular();
    expect(page.getCardTitleText()).toEqual('DashBoard');
  });

  it('should click Add event Menu Link and land the Add event page', () => {
    loginClick();
    browser.waitForAngular();
    page.getAddEventRouterLink().click();
    browser.waitForAngular();
    expect(page.getCardTitleText()).toEqual('Add event');
  });

  it('should click Add event button wiil add new event', () => {
    loginClick();
    // page.getAddEventRouterLink().click();
    // browser.waitForAngular();
    browser.get('http://localhost:4200/event/0/edit')
    browser.waitForAngular();
    page.geteventNameId().sendKeys('event10');
    page.geteventDescriptionId().sendKeys('event desc');
    page.getbaseLocationId().sendKeys('India');
    page.getbeneficiaryNameId().sendKeys('Govern School');
    page.getvenueAddressId().sendKeys('chennai');

    page.getVolunteersRouterLink().click();
    browser.waitForAngular();
    page.gettotalNoVolunteersId().sendKeys('10');
    page.gettotalVolunteHoursId().sendKeys('10');
    page.gettotalTravelHoursId().sendKeys('10');
    page.getlivesImpactedId().sendKeys('10');

    page.AddEvent().click();
    browser.waitForAngular();
    browser.get('http://localhost:4200/event')
    browser.waitForAngular();
    expect(page.getCardTitleText()).toEqual('Events');
    
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
