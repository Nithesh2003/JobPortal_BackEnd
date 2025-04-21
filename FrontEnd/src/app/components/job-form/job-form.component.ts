import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ToastrService } from 'ngx-toastr'; 
import { AbstractControl, ValidationErrors } from '@angular/forms';


export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const inputDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  return inputDate > today ? null : { futureDate: true };
}

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isDialogOpen: boolean = true;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      job_title: ['', [Validators.required, Validators.maxLength(100)]],
      company_name: ['', [Validators.required, Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.maxLength(100)]],
      job_type: ['', Validators.required],
      salary_range: ['', Validators.maxLength(50)],
      job_description: ['', [Validators.required, Validators.maxLength(1000)]],
      application_deadline: ['', [Validators.required, futureDateValidator]]
    });

    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.isEditMode = true;
      this.isDialogOpen = true;
      this.loadJobData(+jobId);
    }
  }

  loadJobData(id: number): void {
    this.isLoading = true;
    this.jobService.getJobById(id).subscribe(
      (data) => {
        this.jobForm.patchValue(data);
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error(error.error?.message || 'Failed to load job data.', 'Error'); 
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched(); 
      this.toastr.warning('Please fill out all required fields.', 'Validation'); 
      return;
    }

    this.isLoading = true;

    const jobData = {
      ...this.jobForm.value,
      application_deadline: new Date(this.jobForm.value.application_deadline).toISOString().split('T')[0]
    };

    if (this.isEditMode) {
      const jobId = this.route.snapshot.paramMap.get('id');
      if (jobId) {
        this.jobService.updateJob(+jobId, jobData).subscribe(
          () => {
            this.toastr.success('Job updated successfully!', 'Success'); 
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['/poster/jobs']);
            }, 2000);
          },
          (error) => {
            this.toastr.error(error.error?.message || 'Failed to update the job.', 'Error'); 
            this.isLoading = false;
          }
        );
      }
    } else {
      this.jobService.createJob(jobData).subscribe(
        () => {
          this.toastr.success('Job posted successfully!', 'Success'); 
          this.isLoading = false;
          this.jobForm.reset();

          Object.keys(this.jobForm.controls).forEach(key => {
            this.jobForm.get(key)?.setErrors(null);
            this.jobForm.get(key)?.markAsPristine();
            this.jobForm.get(key)?.markAsUntouched();
          });

          this.jobForm.markAsPristine();
          this.jobForm.markAsUntouched();
        },
        (error) => {
          this.toastr.error(error.error?.message || 'Failed to post job.', 'Error'); 
          this.isLoading = false;
        }
      );
    }
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.router.navigate(['/poster/jobs']);
  }
}
