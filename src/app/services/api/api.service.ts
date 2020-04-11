import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, take, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  header: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'https://jsonplaceholder.typicode.com';

const usersEndpoint = '/users'; // 10
const imagesEndpoint = '/photos'; // 5000

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
        tap((users: Array<object>) => console.log('users fetched')),
        map((users: Array<object>)  => users.slice(0, 10)),
        catchError(this.handleError('get users', []))
      );
  }

  getImages(): Observable<any> {
    return this.http.get(`${apiUrl}${imagesEndpoint}`)
      .pipe(
        tap((images: Array<object>) => console.log('images fetched')),
        map((images: Array<object>)  => images.slice(0, 100)),
        catchError(this.handleError('get images', []))
      );
  }
}
