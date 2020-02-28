import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { UserModule } from './user/user.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ReportModule } from './report/report.module';
import { JwtInterceptor } from './httpInterceptor/jwt.Interceptor';
import { ConfigurationModule } from './configuration/configuration.module';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    HomeModule,
    ReportModule,
    ConfigurationModule,
    AppRoutingModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
