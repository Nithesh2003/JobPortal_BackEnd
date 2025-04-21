import { Component } from '@angular/core';

@Component({
  selector: 'app-jobposter-layout',
  templateUrl: './jobposter-layout.component.html',
  styleUrls: ['./jobposter-layout.component.css']
})
export class JobposterLayoutComponent {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
