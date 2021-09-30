import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { President } from './president';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class PresidentService {

  private presidentsUrl = 'api/presidents';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getPresidents(): Observable<President[]> {
    return this.http.get<President[]>(this.presidentsUrl)
      .pipe(
        tap(_ => this.log('fetched presidents')),
        catchError(this.handleError<President[]>('getPresidents', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getPresidentNo404<Data>(id: number): Observable<President> {
    const url = `${this.presidentsUrl}/?id=${id}`;
    return this.http.get<President[]>(url)
      .pipe(
        map(presidents => presidents[0]), // returns a {0|1} element array
        tap(p => {
          const outcome = p ? `fetched` : `did not find`;
          this.log(`${outcome} president id=${id}`);
        }),
        catchError(this.handleError<President>(`getPresident id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPresident(id: number): Observable<President> {
    const url = `${this.presidentsUrl}/${id}`;
    return this.http.get<President>(url).pipe(
      tap(_ => this.log(`fetched president id=${id}`)),
      catchError(this.handleError<President>(`getPresident id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPresidents(term: string): Observable<President[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<President[]>(`${this.presidentsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found presidents matching "${term}"`) :
         this.log(`no presidents matching "${term}"`)),
      catchError(this.handleError<President[]>('searchPresidents', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addPresident(president: President): Observable<President> {
    return this.http.post<President>(this.presidentsUrl, president, this.httpOptions).pipe(
      tap((newPresident: President) => this.log(`added president w/ id=${newPresident.id}`)),
      catchError(this.handleError<President>('addPresident'))
    );
  }

  /** DELETE: delete the hero from the server */
  deletePresident(id: number): Observable<President> {
    const url = `${this.presidentsUrl}/${id}`;

    return this.http.delete<President>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted president id=${id}`)),
      catchError(this.handleError<President>('deletePresident'))
    );
  }

  /** PUT: update the hero on the server */
  updatePresident(president: President): Observable<any> {
    return this.http.put(this.presidentsUrl, president, this.httpOptions).pipe(
      tap(_ => this.log(`updated president id=${president.id}`)),
      catchError(this.handleError<any>('updatePresident'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PresidentService: ${message}`);
  }
}