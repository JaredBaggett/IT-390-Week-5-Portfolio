import { Component, OnInit } from '@angular/core';
import {President} from '../president';
import { PresidentService } from '../president.service';


@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.css']
})
export class PresidentComponent implements OnInit {

  presidents: President[] = [];
  constructor(private presidentService: PresidentService) { }

  ngOnInit() {
    this.getPresidents()
  }

  getPresidents(): void {
    this.presidentService.getPresidents()
        .subscribe(presidents => this.presidents = presidents);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.presidentService.addPresident({ name } as President)
      .subscribe(president => {
        this.presidents.push(president);
      });
  }

  delete(president: President): void {
    this.presidents = this.presidents.filter(p => p !== president);
    this.presidentService.deletePresident(president.id).subscribe();
  }
}

