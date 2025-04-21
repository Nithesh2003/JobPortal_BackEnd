export interface Job {
    id?: number;
    job_title: string;
    company_name: string;
    location: string;
    job_type: 'Full-time' | 'Part-time' | 'Internship';
    salary_range?: string;
    job_description: string;
    application_deadline: string;
  }
  