import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../objectTypes/User';
import { ApiImage } from '../../objectTypes/ApiImage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
        tap((users: Array<User>) => console.log('users fetched')),
        map((users: Array<User>) => users.slice(0, 10)),
        catchError(this.handleError('get users', []))
      );
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${apiUrl}${usersEndpoint}`, user, httpOptions)
      .pipe(
        tap((u: User) => console.log(`added user id=${u.id}`)),
        catchError(this.handleError<User>('add user'))
      );
  }

  getImages(): Observable<any> {
    return this.http.get(`${apiUrl}${imagesEndpoint}`)
      .pipe(
        tap((images: Array<ApiImage>) => console.log('images fetched')),
        map((images: Array<ApiImage>) => images.slice(0, 100)),
        catchError(this.handleError('get images', []))
      );
  }

  getImage(imageId: number) {
    return this.http.get(`${apiUrl}${imagesEndpoint}/${imageId}`)
      .pipe(
        tap((image: ApiImage) => console.log('1 image fetched')),
        catchError(this.handleError('get 1 image', []))
      );
  }
}
