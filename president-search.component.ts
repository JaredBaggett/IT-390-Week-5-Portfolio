import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { President } from '../president';
import { PresidentService } from '../president.service';

@Component({
  selector: 'app-president-search',
  templateUrl: './president-search.component.html',
  styleUrls: [ './president-search.component.css' ]
})
export class PresidentSearchComponent implements OnInit {
  presidents$!: Observable<President[]>;
  private searchTerms = new Subject<string>();

  constructor(private presidentService: PresidentService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.presidents$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.presidentService.searchPresidents(term)),
    );
  }
}