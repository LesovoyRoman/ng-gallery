import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  header: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'https://jsonplaceholder.typicode.com';

const usersEndpoint = '/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers(): Observable<any> {
    return this.http.get(`${apiUrl}${usersEndpoint}`)
      .pipe(
        tap(users => console.log('users fetched')),
        catchError(this.handleError('get users', []))
      );
  }
}
