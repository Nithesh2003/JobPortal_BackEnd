import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobDetailsComponent } from './components/job-detail/job-details.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';


import { ApplicantLayoutComponent } from './layout/applicant-layout/applicant-layout.component';
import { JobposterLayoutComponent } from './layout/jobposter-layout/jobposter-layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'poster',
    component: JobposterLayoutComponent,
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobListComponent },
      { path: 'jobs/new', component: JobFormComponent },
      { path: 'jobs/edit/:id', component: JobFormComponent },
      { path: 'jobs/:id', component: JobDetailsComponent },
      
    ]
  },

  {
    path: 'applicant',
    component: ApplicantLayoutComponent,
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobListComponent },
      { path: 'jobs/:id', component: JobDetailsComponent },
      { path: 'jobs/:id/apply', component: ApplicationFormComponent },
      { path: 'applications', component: ApplicationListComponent }
      
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
