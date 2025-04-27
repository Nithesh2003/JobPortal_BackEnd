import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobsUrl = 'http://localhost:5000/api/jobs';
  private applicationsUrl = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(this.jobsUrl).pipe(catchError(this.handleError));
  }

  getJobById(id: number): Observable<any> {
    return this.http.get(`${this.jobsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post(this.jobsUrl, jobData).pipe(catchError(this.handleError));
  }

  updateJob(id: number, jobData: any): Observable<any> {
    return this.http.put(`${this.jobsUrl}/${id}`, jobData).pipe(catchError(this.handleError));
  }
  
  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.jobsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  applyToJob(jobId: number, applicationData: any): Observable<any> {
    return this.http.post(`${this.applicationsUrl}/jobs/${jobId}/apply`, applicationData).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.error instanceof ErrorEvent
        ? `Client-side error: ${error.error.message}`
        : `Backend error: ${error.status} - ${error.message}`;
    console.error(message);
    return throwError(() => ({
      status: error.status,
      statusText: error.statusText,
      message: message
    }));
  }
}
