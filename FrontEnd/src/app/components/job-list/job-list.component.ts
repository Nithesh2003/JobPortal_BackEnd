import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // ✅ Toastr import

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  isLoading = true;
  errorMessage = '';
  userType: 'applicant' | 'poster' = 'applicant'; // Default to applicant
  displayedColumns: string[] = ['title', 'company', 'location', 'type', 'salary', 'deadline', 'actions'];

  constructor(
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService // ✅ Inject Toastr
  ) {}

  ngOnInit(): void {
    this.detectUserType();
    this.fetchJobs();
  }

  // Detect user type based on the route
  detectUserType(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/poster/')) {
      this.userType = 'poster'; // Poster views
    } else if (currentUrl.includes('/applicant/')) {
      this.userType = 'applicant'; // Applicant views
    }
  }

  // Fetch jobs from API
  fetchJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
       // this.toastr.success('Jobs loaded successfully!', 'Success'); // ✅ Success toast
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load job listings.';
        this.isLoading = false;
        this.toastr.error(this.errorMessage, 'Error'); // ✅ Error toast
      }
    });
  }

  // Delete job handler for poster
  deleteJob(id: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe(() => {
        this.jobs = this.jobs.filter(job => job.id !== id);
        this.toastr.warning('Job deleted successfully.', 'Deleted'); // ✅ Warning toast
      }, (err) => {
        this.toastr.error('Failed to delete the job.', 'Error'); // ✅ Error toast
      });
    }
  }
}
