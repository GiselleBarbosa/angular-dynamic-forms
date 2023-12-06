import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, catchError, retry, tap, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { QuestionBase } from './../components/models/question-base.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly dropdownQuestionAPI = environment.questionAPI;

  private readonly questionObservable = new Subject<QuestionBase<string>[]>();
  public question$ = this.questionObservable.asObservable();

  private constructor(private http: HttpClient) {}

  public getQuestions(): void {
    this.http
      .get<QuestionBase<string>[]>(`${this.dropdownQuestionAPI}`)
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((questions) => {
          this.questionObservable.next(questions);
          console.log(questions);
        })
      )
      .subscribe();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
