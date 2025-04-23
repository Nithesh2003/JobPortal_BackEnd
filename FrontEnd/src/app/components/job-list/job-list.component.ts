import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = []; // for displaying
  jobId: number | null = null;
  isLoading = true;
  errorMessage = '';
  userType: 'applicant' | 'poster' = 'applicant'; 
  displayedColumns: string[] = ['title', 'company', 'location', 'type', 'salary', 'deadline', 'actions'];
  alljobs: any[] = []; // for storing full data

  constructor(
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.detectUserType();
    this.fetchJobs();
  }

  
  detectUserType(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/poster/')) {
      this.userType = 'poster'; 
    } else if (currentUrl.includes('/applicant/')) {
      this.userType = 'applicant'; 
    }
  }

  // Fetch jobs from API
  fetchJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
        this.alljobs = data;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load job listings.';
        this.isLoading = false;
        this.toastr.error(this.errorMessage, 'Error'); 
      }
    });
  }

  searchByJobId(): void {
    if (this.jobId === 0 ) {
      this.toastr.error('No job found with the specified Job ID.', 'Error');
    }
    
    if (this.jobId) {
      // Filter jobs by the entered Job ID
      const filteredJobs = this.alljobs.filter(job => job.id === this.jobId);
      
      if (filteredJobs.length > 0) {
        this.jobs = filteredJobs;
      } else {
        this.jobs=[];
        this.toastr.error('No jobs found with the specified Job ID.', 'Error');
        // Fetch all jobs if no job is found for the given ID
      }
    } else {
      this.jobs = this.alljobs; // Fetch all jobs if no Job ID is entered
    }
  }
  
  // Delete job 
  deleteJob(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe(() => {
        this.jobs = this.jobs.filter(job => job.id !== id);
        this.toastr.warning('Job deleted successfully.', 'Deleted'); 
      }, (err) => {
        this.toastr.error('Failed to delete the job.', 'Error'); 
      });
    }
  }
}
