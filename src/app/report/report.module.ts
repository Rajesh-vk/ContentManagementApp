import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../user/auth.guard';
import { ReportComponent } from './report.component';
import { MustMatchDirective } from '../Directives/MatchDir';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
        {
            path: 'report',
            component: ReportComponent,
         },
    ])
  ],
  declarations: [
    ReportComponent,
    MustMatchDirective
  ]
})
export class ReportModule { }
