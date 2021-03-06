import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Outreach FMS';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

   get userName(): string {
    if (this.authService.LoggedUser) {
      return this.authService.LoggedUser;
    }
    return '';
  }
  get userRole(): string {
    if (this.authService.loggedUserRole) {
      return this.authService.loggedUserRole;
    }
    return '';
  }


  constructor(private authService: AuthService,
              private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.authService.loadingSubject.next(true);
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          this.authService.loadingSubject.next(false);
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
