import { Observable, Subject, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
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

  public getQuestions(): Observable<QuestionBase<string>[]> {
    return this.http
      .get<QuestionBase<string>[]>(`${this.dropdownQuestionAPI}`)
      .pipe(
        tap((questions) => {
          this.questionObservable.next(questions);
          console.log(questions);
        })
      );
  }
}
