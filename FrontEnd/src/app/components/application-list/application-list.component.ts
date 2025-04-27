import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'id',
    'job_id',
    'applicant_name',
    'email',
    'resume_link',
    'applied_at'
  ];
  jobId: number | null = null;
  allApplications: any[] = []; // To store all applications

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  fetchApplications(): void {
    this.http.get<any[]>('http://localhost:5000/api/applications').subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.allApplications = data;  // Store the full applications list
        this.dataSource.data = data;  // Initially, set the dataSource to full list
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
        this.toastr.error('Error fetching applications.', 'Error');
      }
    });
  }

  filterByJobId(): void {
    if (this.jobId === 0) {
      this.toastr.error('No application found listing all the jobs.', 'Error');
    } 
    
    if (this.jobId) {
      // Filter the data based on the entered jobId
      const filteredApplications = this.allApplications.filter(app => app.job_id === this.jobId);

      if (filteredApplications.length > 0) {
        this.dataSource.data = filteredApplications; // Show filtered data
      } else {  
        this.dataSource.data = []; // Clear the data if no matching job
        this.toastr.error('No applications found with the specified Job ID.', 'Error');
      }
    } else {
      this.dataSource.data = this.allApplications;
    }
  }
}
