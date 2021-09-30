import { Component, OnInit } from '@angular/core';
import {President} from '../president'
import { PresidentService } from '../president.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  presidents: President[] = [];

  constructor(private presidentService: PresidentService) { }

  ngOnInit() {
    this.getPresidents();
  }
  getPresidents(): void {
    this.presidentService.getPresidents()
      .subscribe(presidents => this.presidents = presidents.slice(1, 5));
  }
}
