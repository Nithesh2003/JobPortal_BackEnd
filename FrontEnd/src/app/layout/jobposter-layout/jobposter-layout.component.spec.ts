import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobposterLayoutComponent } from './jobposter-layout.component';

describe('JobposterLayoutComponent', () => {
  let component: JobposterLayoutComponent;
  let fixture: ComponentFixture<JobposterLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobposterLayoutComponent]
    });
    fixture = TestBed.createComponent(JobposterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
