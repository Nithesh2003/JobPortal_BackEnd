import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatSort) sort!: MatSort; 

  constructor(private http: HttpClient) {}

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
        this.dataSource.data = data; 
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
      }
    });
  }
  
  filterByJobId(): void {
    if (this.jobId) {
      this.dataSource.data = this.dataSource.data.filter(app => app.job_id == this.jobId);
    } else {
      this.fetchApplications();
    }
  }
}
