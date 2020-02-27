import { Injectable } from '@angular/core';

import { User } from '../Model/User';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  get LoggedUser(): string {

    const username = JSON.parse(localStorage.getItem('currentUser'));
    return username.username;
  }

  private loginUrl = environment.authApiUrl;

  constructor(private httpUrl: HttpClient) { }


  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpUrl.post<any>(this.loginUrl, { Username: username, Password: password }, { headers })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
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
