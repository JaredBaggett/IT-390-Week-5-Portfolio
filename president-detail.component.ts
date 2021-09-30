import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { President } from '../president';
import {PresidentService} from '../president.service'

@Component({
  selector: 'app-president-detail',
  templateUrl: './president-detail.component.html',
  styleUrls: [ './president-detail.component.css' ]
})
export class PresidentDetailComponent implements OnInit {
  president: President | undefined;

  constructor(
    private route: ActivatedRoute,
    private presidentService: PresidentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPresident();
  }

  getPresident(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.presidentService.getPresident(id)
      .subscribe(president => this.president = president);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.president) {
      this.presidentService.updatePresident(this.president)
        .subscribe(() => this.goBack());
    }
  }
}