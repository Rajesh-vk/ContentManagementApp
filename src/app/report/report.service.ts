import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, combineLatest, EMPTY, from, merge, Subject, throwError, of, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap } from 'rxjs/operators';
import { User } from '../Model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private userUrl = environment.baseApiUrl + environment.userApiUrl;

  private registerUrl = environment.authApiRegisterUrl;

  userList$ = this.httpUrl.get<User[]>(this.userUrl)
    .pipe(
      catchError(this.handleError),
    );

    pmoUser$ = combineLatest([
      this.userList$,
    ])
      .pipe(
        map(([users]) =>
        users.filter(user => user.userRoleId === 2)),
        catchError(this.handleError),
      );

  constructor(private httpUrl: HttpClient) { }

  getUserById(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.httpUrl.get<User>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    delete user.id;
    return this.httpUrl.post<User>(this.registerUrl, user, { headers })
      .pipe(
        tap(data => console.log('createuser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<{}> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userUrl}/${id}`;
    return this.httpUrl.delete<User>(url)
      .pipe(
        tap(data => console.log('deleteUser: ' + id)),
        catchError(this.handleError)
      );
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userUrl}/${user.id}`;
    delete user.id;
    delete user.password;
    return this.httpUrl.put<User>(url, user, { headers })
      .pipe(
        tap(() => console.log('updateUser: ' + user.id)),
        // Return the User on an update
        map(() => user),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
