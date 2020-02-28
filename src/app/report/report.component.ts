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
  model: User;

  ngOnInit() {
  }

  onSubmit() {
    this.reportService.createUser(this.model).pipe(first())
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
