import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private http: HttpClient) { }

  /**
    * @param method Accept("GET" | "POST" | "PUT" | "DELETE")
    * @param url string ; ex : /Posts
    * @param body object = {}
    * @param options Optional Params , Object= {} Accept("params:{},headers:{}"),
    * ex : const options = {
    *              params:{
    *                "postId":"1",
    *                "email": "eliseo@gardner.biz"
    *              },
    *                headers:{
    *                "Authorization":"Bearer tfweydsxkmewygsnxwdbxaweynsxawedbxswebhj"
    *              }
    *            }
    *
  */

   httpCall<T>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, body: object = {}, options?: any): Observable<T> {

    console.log("body===", body)
    let serverUrl: string = environment.serverUrl;
    const Url = serverUrl + url;

    let headers = new HttpHeaders();
    let params = new HttpParams();
    headers = headers.append("Content-Type", "application/json");

    if (typeof (options) == "object") {
      if (options.hasOwnProperty('headers')) {
        for (let key in options['headers']) {
          headers = headers.append(key, options['headers'][key]);
        }
      }
      if (options.hasOwnProperty('params')) {
        for (let key in options['params']) {
          params = params.append(key, options['params'][key]);
        }
      }
    }
    switch (method) {
      case "GET": {
        return this.http.get<T>(Url, { headers, params }).pipe(
          map(res => <T>res),
          catchError(this.handleError));
      }
      case "POST": {
        return this.http.post<T>(Url, body, { headers, params }).pipe(
          map(res => <T>res),
          catchError(this.handleError));
      }
      case "PUT": {
        return this.http.put<T>(Url, body, { headers, params }).pipe(
          map(res => <T>res),
          catchError(this.handleError));
      }
      case "DELETE": {
        return this.http.delete<T>(Url, { headers, params }).pipe(
          map(res => <T>res),
          catchError(this.handleError));
      }
      default: {
        return of();
      }
    }
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
   private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it   accordingly.
      console.error('An error occurred:', errorResponse.error);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ${errorResponse.status}, ' +
        'body was: ${errorResponse.error}');
    }
    // return an observable with a user-facing error message
    return throwError(errorResponse.error)
  };
}

