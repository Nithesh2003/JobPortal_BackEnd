import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ToastrService } from 'ngx-toastr'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job: any = {};
  isLoading = true;
  errorMessage = '';
  userType: 'applicant' | 'poster' = 'applicant';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService, 
    private location: Location
  ) {}
  

  ngOnInit(): void {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/poster/')) {
      this.userType = 'poster';
    } else if (currentUrl.includes('/applicant/')) {
      this.userType = 'applicant';
    }

    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.fetchJobById(+jobId);
    }
  }

  fetchJobById(id: number): void {
    this.jobService.getJobById(id).subscribe(
      (data) => {
        this.job = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error.message || 'Failed to load job details.';
        this.isLoading = false;
        this.toastr.error(this.errorMessage, 'Error'); 
      }
    );
  }

  applyToJob(): void {
    const applicationData = { applicant: 'userId' }; 
    this.jobService.applyToJob(this.job.id, applicationData).subscribe(
      () => this.toastr.success('Applied successfully!', 'Success'), 
      () => this.toastr.error('Failed to apply.', 'Error') 
    );
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe(
        () => {
          this.toastr.success('Job deleted successfully.', 'Deleted'); 
          this.router.navigate(['/poster/jobs']);
        },
        (error) => {
          this.toastr.error('Failed to delete job.', 'Error'); 
          console.error('Delete error:', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
