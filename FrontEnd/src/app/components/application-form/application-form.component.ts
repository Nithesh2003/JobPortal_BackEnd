import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const jobId = id ? +id : null;

      this.applicationForm = this.fb.group({
        applicantName: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
        resumeLink: ['', [Validators.required, Validators.maxLength(255)]],
        jobId: [{ value: jobId, disabled: true }, Validators.required]
      });
    });
  }

  applyForJob() {
    if (!this.applicationForm.valid) return;

    const formValue = this.applicationForm.getRawValue();

    const applicationData = {
      applicant_name: formValue.applicantName,
      email: formValue.email,
      resume_link: formValue.resumeLink
    };

    const jobId = formValue.jobId;

    const url = `http://localhost:5000/api/applications/jobs/${jobId}/apply`;

    this.http.post(url, applicationData).subscribe({
      next: res => {
        console.log('✅ Application submitted!', res);
        this.isSubmitted = true;
        this.toastr.success('🎉 Application submitted successfully!', 'Success');
      },
      error: err => {
        console.error('❌ Error submitting:', err);
        this.toastr.error('Something went wrong. Please try again.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/applicant/jobs']);
  }

  get f() {
    return this.applicationForm.controls;
  }
}