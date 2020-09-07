import { Injectable } from '@angular/core';

import { AuthModel } from '../Model/authModel';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: AuthModel;
  redirectUrl: string;

  loadingSubject = new BehaviorSubject<boolean>(false);
  loadingAction$ = this.loadingSubject.asObservable();

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  get LoggedUser(): string {

    const username = JSON.parse(localStorage.getItem('currentUser'));
    return username.username;
  }

  get loggedUserRole(): string {

    const userDetails = JSON.parse(localStorage.getItem('currentUser'));
    return userDetails ? userDetails.userRoleId : '';
  }

  private loginUrl = environment.authApiUrl;

  constructor(private httpUrl: HttpClient) { }


  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpUrl.post<any>(this.loginUrl, { Username: username, Password: password }, { headers })
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUser = user;
            }
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}




}
