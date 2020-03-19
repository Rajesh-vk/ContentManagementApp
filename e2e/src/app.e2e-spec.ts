import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getTitleText()).toEqual('OutReach FMS');
  });

  it('should login button has a disabled class', () => {
    page.getUserName().sendKeys('admin');
    // page.getPassword().sendKeys('admin');
    const login = page.getLoginButton();
    expect(login.getAttribute('disabled')).toBeTruthy();
  });

  it('should login button be enabled', () => {
    page.getUserName().sendKeys('admin');
    page.getPassword().sendKeys('admin');
    const login = page.getLoginButton();
    expect(login.getAttribute('disabled')).toBeFalsy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
