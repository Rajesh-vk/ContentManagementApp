import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { ReportService } from '../report/report.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  pageTitle = 'Configuration';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private pmoSubject = new BehaviorSubject<number>(0);
  pmoAction$ = this.pmoSubject.asObservable();

  // Merge Data stream with Action stream
  // To filter to the selected category
  user$ = this.reportService.userList$;

  pmoUser$ = combineLatest([
    this.reportService.userList$,
    this.pmoAction$
  ])
    .pipe(
      map(([users, pmoId]) =>
      users.filter(user =>
        pmoId ? user.UserRole === pmoId : true
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

  onSelected(roleId: string): void {
    this.pmoSubject.next(0);
  }

  onAdd(): void {
    this.pmoSubject.next(1);
  }

  onRemove(): void {
    this.pmoSubject.next(1);
  }



}
