import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { ReportService } from '../report/report.service';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../Model/User';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  pageTitle = 'Configuration';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private pmoSubject = new BehaviorSubject<number>(2);
  pmoAction$ = this.pmoSubject.asObservable();

  private pmoSelectedUser = new BehaviorSubject<string>('0');
  pmoSelectedUserAction$ = this.pmoSelectedUser.asObservable();

  pmoUserDetails: User[];

  // Merge Data stream with Action stream
  // To filter to the selected category
  user$ = this.reportService.userList$;

  pmoUser$ = this.reportService.pmoUser$.pipe(
     tap(data => this.pmoUserDetails = data),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

    selectedUser$ = combineLatest([
      this.reportService.userList$,
      this.pmoSelectedUserAction$
    ])
      .pipe(
        map(([users, userId]) =>
        users.filter(user =>
          userId ? user.id === userId : true
          )),
        catchError(err => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      );

    vm$ = combineLatest([
      this.user$,
      this.pmoUser$
    ])
      .pipe(
        map(([Users, PmoUsers]) =>
          ({ Users, PmoUsers }))
      );

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  onSelected(userId: string): void {
   this.pmoSelectedUser.next(userId);
  }

  onAdd(): void {
    this.selectedUser$.subscribe(
      data => {
        const user: User = data[0];
        user.userRoleId = 2;
        this.reportService.updateUser(user).subscribe({
          next: () => this.onLoad() ,
          error: err => this.errorMessageSubject.next(err),
        });
      }
    );
  }

  onRemove(): void {
    this.selectedUser$.subscribe(
      data => {
        const user: User = data[0];
        user.userRoleId = 1;
        this.reportService.updateUser(user).subscribe({
          next: () => this.onLoad() ,
          error: err => this.errorMessageSubject.next(err),
        });
      }
    );
  }

  onLoad() {
    this.pmoUserDetails = [];
    this.reportService.pmoUser$.subscribe(
      data => this.pmoUserDetails = data,
    );
 }



}
