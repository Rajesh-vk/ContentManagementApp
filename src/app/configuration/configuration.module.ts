import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../user/auth.guard';
import { ConfigurationComponent } from './configuration.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
        {
            path: 'configuration',
            component: ConfigurationComponent,
            canActivate: [AuthGuard]
         },
    ])
  ],
  declarations: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule { }
