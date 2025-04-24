import { NgModule, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobDetailsComponent } from './components/job-detail/job-details.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { JobposterLayoutComponent } from './layout/jobposter-layout/jobposter-layout.component';
import { ApplicantLayoutComponent } from './layout/applicant-layout/applicant-layout.component';
import { CommonModule } from '@angular/common';
import { ApplicationListComponent} from './components/application-list/application-list.component';  
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobListComponent,
    JobFormComponent,
    JobDetailsComponent,
    ApplicationFormComponent,
    JobposterLayoutComponent,
    ApplicantLayoutComponent,
    ApplicationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,CommonModule,ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }

