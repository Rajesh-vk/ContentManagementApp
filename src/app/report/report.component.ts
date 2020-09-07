import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { User } from '../Model/User';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportService: ReportService, private router: Router) { }
  errorMessage: string;
  pageTitle = 'Register';
  model: any = {};
  currentUser: User;
  ngOnInit() {
  }

  onSubmit() {
    this.currentUser = {
      id: null,
    userName: this.model.userName,
    password: this.model.password,
    emailId: this.model.email,
    userRoleId: 1
    };
    this.reportService.createUser(this.currentUser).pipe(first())
    .subscribe(
      data => {
        alert('Registeration completed successfully');
        this.router.navigate(['/dashBoard']);
      },
      error => {
          this.errorMessage = 'Username or password is incorrect';
      });
  }

}
