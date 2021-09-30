import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { President } from './president';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const presidents = [
      {id: 1, name: 'George Washington'},
      { id: 2, name: 'John Adams' },
      { id: 3, name: 'Thomas Jefferson' },
      { id: 4, name: 'James Madison' },
      { id: 5, name: 'James Monroe' },
      { id: 6, name: 'John Quincy Adams' },
      { id: 7, name: 'Andrew Jackson' },
      { id: 8, name: 'Martin Van Buren' },
      { id: 9, name: 'William Henry Harrison' },
      { id: 10, name: 'John Tyler' },
      { id: 11, name: 'James K. Polk' }
    ];
    return {presidents};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(presidents: President[]): number {
    return presidents.length > 0 ? Math.max(...presidents.map(president => president.id)) + 1 : 11;
  }
}